import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  Response,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '../models/users/dto/CreateUser.dto';
import { UsersService } from '../models/users/users.service';
import { AuthService } from './auth.service';
import { AuthenticationGuard } from './guards/auth.guard';
import { UserEntity } from '../models/users/serializers/user.serializer';
import { LoginUserDto } from '../models/users/dto/LoginUser.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller()
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/register')
  @ApiOkResponse({ description: 'Register user' })
  async register(@Body(ValidationPipe) input: CreateUserDto) {
    const check = await this.validate(input.email);
    if (!check) {
      throw new HttpException(
        { message: 'User already exists' },
        HttpStatus.BAD_REQUEST,
      );
    }
    input.password = await this.authService.hashPassword(input.password);
    return this.userService.create(input);
  }

  @Post('/login')
  @ApiOkResponse({ description: 'Login' })
  async login(@Body(ValidationPipe) input: LoginUserDto): Promise<any> {
    const { email, password } = input;
    const user = await this.authService.authentication(email, password);
    if (!user) {
      throw new HttpException(
        { message: 'Username & email not wrong' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.authService.login(user);
  }

  @UseGuards(AuthenticationGuard)
  @Get('/me')
  @ApiOkResponse({ description: 'Get user info' })
  async getUserLoggedIn(@Request() request): Promise<UserEntity> {
    return this.userService.findById(request.user.id);
  }

  @UseGuards(AuthenticationGuard)
  @Post('/logout')
  @ApiOkResponse({ description: 'Logout' })
  async getUserLogout(@Response() response): Promise<Response> {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    response.clearCookie('access_token');
    response.clearCookie('token');

    return response.sendStatus(200);
  }

  async validate(email: string) {
    try {
      const users = await this.userService.geUsersByEmail(email);
      return users.length <= 0;
    } catch (e) {
      return false;
    }
  }
}
