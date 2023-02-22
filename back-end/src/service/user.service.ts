import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { AppDataSource } from '../lib/dataSource';
import { HttpStatus } from '../enums/http-status';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ExeccptionError } from '../lib/error-handling';
import { BaseReponse } from '../reponse/base.response';

export class UserService {
  private useRepository: Repository<User>;

  constructor() {
    this.useRepository = AppDataSource.getRepository(User);
  }

  async getUserById(user_id: number) {
    const user = await this.useRepository.findOne({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      throw new ExeccptionError(HttpStatus.NOT_FOUND, 'User not found');
    }

    return new BaseReponse(HttpStatus.OK, 'Get user successfully', user);
  }

  async updateUser(user_id: number, data: Partial<UpdateUserDto>) {
    const user = await this.useRepository.findOne({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      throw new ExeccptionError(HttpStatus.NOT_FOUND, 'User not found');
    }

    await this.useRepository.save({
      ...user,
      ...data,
      ...(data.full_name && {
        last_name: data.full_name.split(' ')[1] || '',
        first_name: data.full_name.split(' ')[0] || '',
      }),
    });

    return new BaseReponse(HttpStatus.OK, 'Update user successfully');
  }
}
