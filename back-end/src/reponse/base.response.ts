export class BaseReponse<T = any> {
  status: number;
  message: string;
  data: T;

  constructor(status: number, message: string, data?: T) {
    this.status = status || 200;
    this.message = message || 'success';
    this.data = data || null;
  }
}
