import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../enums/http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IRequest } from '../types/context';
import { IJwtPayload } from '../types/jwtPayload';

export const auththentication = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as IJwtPayload;
    req.user_id = decoded.user_id;
    next();
  } catch (error) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      status: HttpStatus.UNAUTHORIZED,
      message: error.message,
    });
  }
};
