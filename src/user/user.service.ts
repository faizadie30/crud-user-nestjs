import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GlobalHelper } from '../helpers/global.helper';
import { FindAllUser } from './dto/find-all-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private readonly globalHelper: GlobalHelper,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<object> {
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
      message: 'Success create user',
    };
  }

  async findAll(request: any, query: FindAllUser): Promise<object> {
    const { keyword, limit, page } = query;
    const setLimiter: any = !limit ? 10 : limit;
    const setPage: any = !page ? 1 : page;

    const offset = (setPage - 1) * setLimiter;
    let customParam = '';

    const sql = this.usersRepository.createQueryBuilder('users');

    if (keyword) {
      sql.where('lower(name) LIKE :keyword', {
        keyword: `%${keyword.toLowerCase()}%`,
      });

      customParam += `keyword=${keyword}`;
    }

    const count = await sql.cache(60000).getCount();

    const getData = await sql
      .skip(offset)
      .take(setLimiter)
      .cache(60000)
      .getMany();

    const countPage = Math.ceil(count / setLimiter);

    const dataPaginate = this.globalHelper.generatePagination(
      'order/list-orders',
      setPage,
      setLimiter,
      countPage,
      count,
      customParam,
    );

    return {
      status: 'success',
      data: getData,
      paginate: dataPaginate,
    };
  }
}
