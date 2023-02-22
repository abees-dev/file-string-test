import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  constructor(loginUserDto: LoginUserDto) {
    this.email = loginUserDto.email;
    this.password = loginUserDto.password;
  }
}
