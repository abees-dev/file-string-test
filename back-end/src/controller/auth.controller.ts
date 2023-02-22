import { NextFunction, Request, Response } from 'express';
import { LoginUserDto } from 'src/dto/login-user.dto';
import { RegisterUserDto } from 'src/dto/register-user.dto';
import { VerifyEmailDto } from 'src/dto/verify-mail.dto';
import { HttpStatus } from 'src/enums/http-status';
import { AuthService } from 'src/service/auth.service';
import { IRequest } from 'src/types/context';
import { validatorDto } from 'src/utils/class-validator';
// import { AuthService } from 'src/service/auth.service';

class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const loginUserDto = new LoginUserDto(req.body);
      await validatorDto(loginUserDto);
      const response = await this.authService.login(loginUserDto, res);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const registerUserDto = new RegisterUserDto(req.body);
      await validatorDto(registerUserDto);
      const response = await this.authService.register(registerUserDto);
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      return next(error);
    }
  }

  async logout(req: IRequest, res: Response, next: NextFunction) {
    try {
      const response = await this.authService.logout(req.user_id, res);
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      return next(error);
    }
  }

  async refreshToken(req: IRequest, res: Response, next: NextFunction) {
    try {
      const response = await this.authService.refreshToken(req);
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      return next(error);
    }
  }

  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const verifyEmailDto = new VerifyEmailDto(req.body);
      await validatorDto(verifyEmailDto);
      const response = await this.authService.verifyEmail(verifyEmailDto);
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      return next(error);
    }
  }
}

export default new AuthController();
