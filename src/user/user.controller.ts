import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { FindAllUser } from './dto/find-all-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(200)
  async create(@Body() createUserDto: CreateUserDto): Promise<object> {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @HttpCode(200)
  async findAll(
    @Request() request: any,
    @Query() query: FindAllUser,
  ): Promise<object> {
    return await this.userService.findAll(request, query);
  }
}
