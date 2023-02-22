import { NextFunction, Request, Response } from 'express';

export const handlerError = (error: ExeccptionError, _req: Request, res: Response, _next: NextFunction) => {
  return res.status(error?.status || 500).json({
    status: error?.status || 500,
    message: error.message,
  });
};

export class ExeccptionError extends Error {
  status?: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}
