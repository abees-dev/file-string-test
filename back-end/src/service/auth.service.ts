import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { User } from '../entities/user.entity';
import { Auth } from '../entities/auth.entity';
import { RabbitMQ } from '../utils/rabbitmq';
import { AppDataSource } from '../lib/dataSource';
import { LoginUserDto } from '../dto/login-user.dto';
import { HttpStatus } from '../enums/http-status';
import { ExeccptionError } from '../lib/error-handling';
import { BaseReponse } from '../reponse/base.response';
import { RegisterUserDto } from '../dto/register-user.dto';
import { IJwtPayload } from '../types/jwtPayload';
import { VerifyEmailDto } from '../dto/verify-mail.dto';
import { redis } from '../utils/redis';

export class AuthService {
  private useRepository: Repository<User>;
  private authRepository: Repository<Auth>;
  private RabbitMQ: RabbitMQ;
  constructor() {
    this.useRepository = AppDataSource.getRepository(User);
    this.authRepository = AppDataSource.getRepository(Auth);
    this.RabbitMQ = RabbitMQ.getInstance();
  }

  async decodePassword(password: string, passwordHash: string) {
    return await bcrypt.compare(password, passwordHash);
  }

  generateToken(user_id: number, type: number) {
    // type = 1: access token (1h)
    // type = 2: refresh token (7d)
    const secret = type === 1 ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET;
    return jwt.sign({ user_id }, secret, { expiresIn: type === 1 ? '2m' : '7d' });
  }

  async createAuth(user_id: number, res: Response) {
    const existAuth = await this.authRepository.findOne({
      where: {
        user_id: user_id,
      },
    });

    const access_token = this.generateToken(user_id, 1);
    const refresh_token = this.generateToken(user_id, 2);

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
      secure: process.env.NODE_ENV == 'production',
      domain: process.env.NODE_ENV == 'production' ? 'abeesdev.com' : 'localhost',
    });

    if (existAuth) {
      existAuth.access_token = access_token;
      existAuth.refresh_token = refresh_token;
      await this.authRepository.save(existAuth);
      return { access_token };
    }
    await this.authRepository
      .create({
        user_id: user_id,
        access_token: access_token,
        refresh_token: refresh_token,
      })
      .save();

    return { access_token };
  }

  async login(loginUserDto: LoginUserDto, res: Response) {
    const { email, password } = loginUserDto;

    const existUser = await this.useRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!existUser) {
      throw new ExeccptionError(HttpStatus.BAD_REQUEST, 'Invalid email or password!');
    }

    if (existUser.is_verified === 0) {
      throw new ExeccptionError(HttpStatus.BAD_REQUEST, 'Please verify your email!');
    }

    const isMatch = await this.decodePassword(password, existUser.password);

    if (!isMatch) {
      throw new ExeccptionError(HttpStatus.BAD_REQUEST, 'Invalid email or password!');
    }

    const token = await this.createAuth(existUser.id, res);
    delete existUser.password;

    return new BaseReponse(HttpStatus.OK, 'Login success!', {
      access_token: token.access_token,
      user: existUser,
    });
  }

  async register(registerUserDto: RegisterUserDto) {
    const { email, first_name, last_name, password } = registerUserDto;

    const existUser = await this.useRepository.findOne({
      where: {
        email: email,
      },
    });

    if (existUser && existUser.is_verified === 1) {
      throw new ExeccptionError(HttpStatus.CONFLICT, 'User already exist!');
    }

    if (existUser && existUser.is_verified === 0) {
      await this.RabbitMQ.publishToQueue('send-mail', { email });
      return new BaseReponse(HttpStatus.OK, 'Please check your email!');
    }

    await this.useRepository
      .create({
        email,
        first_name,
        last_name,
        password,
        full_name: `${first_name} ${last_name}`,
      })
      .save();

    await this.RabbitMQ.publishToQueue('send-mail', { email });
    return new BaseReponse(HttpStatus.OK, 'Please check your email!');
  }

  async logout(user_id: number, res: Response) {
    res.clearCookie('refresh_token');
    await this.authRepository.update({ user_id }, { access_token: '' });
    return new BaseReponse(HttpStatus.OK, 'Logout success!');
  }

  async refreshToken(req: Request) {
    const refreshToken = req.cookies['refresh_token'];

    if (!refreshToken) {
      throw new ExeccptionError(HttpStatus.BAD_REQUEST, 'Invalid refresh token!');
    }
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as IJwtPayload;

    const existAuth = await this.authRepository.findOne({
      where: {
        user_id: decoded.user_id,
      },
    });

    if (!existAuth) {
      throw new ExeccptionError(HttpStatus.BAD_REQUEST, 'Invalid refresh token!');
    }

    const access_token = this.generateToken(decoded.user_id, 1);

    await this.authRepository.update({ user_id: decoded.user_id }, { access_token: access_token });

    return new BaseReponse(HttpStatus.OK, 'Refresh token success!', {
      access_token: access_token,
    });
  }

  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    const { email, code } = verifyEmailDto;

    const existUser = await this.useRepository.findOne({
      where: {
        email: email,
        is_verified: 1,
      },
    });

    if (existUser) {
      await redis.del(email);
      return new BaseReponse(HttpStatus.OK, 'Verify email success!');
    }

    const verifyCode = await redis.get(email);

    if (!verifyCode) {
      throw new ExeccptionError(HttpStatus.BAD_REQUEST, 'Verify code is expired!');
    }

    if (verifyCode !== code) {
      throw new ExeccptionError(HttpStatus.BAD_REQUEST, 'Invalid verify code!');
    }

    await this.useRepository.update({ email: email }, { is_verified: 1 });

    await redis.del(email);
    return new BaseReponse(HttpStatus.OK, 'Verify email success!');
  }
}
