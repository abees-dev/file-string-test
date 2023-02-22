import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  constructor(verifyEmail: VerifyEmailDto) {
    this.email = verifyEmail.email;
    this.code = verifyEmail.code;
  }
}
