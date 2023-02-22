import { Request } from 'express';

export interface IRequest extends Request {
  user_id: number;
}
