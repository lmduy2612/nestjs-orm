import {
  Get,
  Put,
  Post,
  Body,
  Delete,
  Param,
  Controller,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserEntity } from './serializers/user.serializer';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/CreateUser.dto';
import { AuthenticationGuard } from '../../auth/guards/auth.guard';
import * as bcrypt from 'bcrypt';

@UseGuards(AuthenticationGuard)
@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  async index() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  async getById(@Param() params): Promise<UserEntity> {
    const user = await this.usersService.findById(params.id, ['messages']);
    this.throwUserNotFound(user);
    return user;
  }

  @Post('/')
  async create(@Body() inputs: CreateUserDto): Promise<UserEntity> {
    const check = await this.validate(inputs.email);
    if (!check) {
      throw new HttpException(
        { message: 'User already exists' },
        HttpStatus.BAD_REQUEST,
      );
    }
    inputs.password = await this.hashPassword(inputs.password);
    return await this.usersService.create(inputs);
  }

  @Put('/:id')
  async update(@Param() params, @Body() inputs: User): Promise<UserEntity> {
    const user = await this.usersService.findById(parseInt(params.id, 0));
    this.throwUserNotFound(user);
    return await this.usersService.update(user, inputs);
  }

  @Delete('/:id')
  async delete(@Param() params): Promise<boolean> {
    const user = await this.usersService.findById(parseInt(params.id, 0));
    this.throwUserNotFound(user);
    return await this.usersService.deleteById(params.id);
  }

  throwUserNotFound(user: User | UserEntity) {
    if (!user) {
      throw new HttpException("User don't exists", HttpStatus.NOT_FOUND);
    }
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async validate(email: string) {
    try {
      const users = await this.usersService.geUsersByEmail(email);
      return users.length <= 0;
    } catch (e) {
      return false;
    }
  }
}
