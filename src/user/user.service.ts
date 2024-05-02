import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GlobalHelper } from '../helpers/global.helper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private readonly globalHelper: GlobalHelper,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto;

    const checkAvailableUser = await this.usersRepository
      .createQueryBuilder('users')
      .where('users.email = :email', {
        email,
      })
      .getExists();

    if (checkAvailableUser) {
      throw new ConflictException('User telah terdaftar!');
    }

    const user = new Users();
    user.name = name;
    user.email = email;
    user.password = await this.globalHelper.encryptPassword(password);
    await this.usersRepository.save(user);

    return {
      status: 'success',
      message: 'Success',
    };
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
