import { JwtPayload } from 'jsonwebtoken';

export interface IJwtPayload extends JwtPayload {
  user_id: number;
}
