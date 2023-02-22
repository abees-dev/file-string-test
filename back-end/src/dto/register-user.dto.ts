import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  constructor(registerUserDto: RegisterUserDto) {
    this.email = registerUserDto.email;
    this.password = registerUserDto.password;
    this.first_name = registerUserDto.first_name;
    this.last_name = registerUserDto.last_name;
  }
}
