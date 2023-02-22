import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  nick_name: string;

  @IsNumber()
  @IsOptional()
  gender: number;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  day_of_birth: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  full_name: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  country: string;

  constructor(updateUser: Partial<UpdateUserDto>) {
    updateUser.address && (this.address = updateUser.address);
    updateUser.avatar && (this.avatar = updateUser.avatar);
    updateUser.city && (this.city = updateUser.city);
    updateUser.country && (this.country = updateUser.country);
    updateUser.day_of_birth && (this.day_of_birth = updateUser.day_of_birth);
    updateUser.full_name && (this.full_name = updateUser.full_name);
    updateUser.phone && (this.phone = updateUser.phone);
    updateUser.nick_name && (this.nick_name = updateUser.nick_name);
    updateUser.gender && (this.gender = updateUser.gender);
  }
}
