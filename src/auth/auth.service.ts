import { Injectable } from '@nestjs/common';
import { UserSerializer } from '../models/users/serializers/user.serializer';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from './interfaces/auth-payload.interface';
import * as moment from 'moment';
import { UsersService } from '../models/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async authentication(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    const check = await this.comparePassword(password, user.password);

    if (!user || !check) {
      return false;
    }

    return user;
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async comparePassword(
    password: string,
    storePasswordHash: string,
  ): Promise<any> {
    return await bcrypt.compare(password, storePasswordHash);
  }

  async login(user: UserSerializer) {
    const payload: AuthPayload = {
      name: user.name,
      email: user.email,
      id: user.id,
    };
    const expiresTime = 100;

    return {
      expiresIn: moment().add(expiresTime, 'days'),
      token: this.jwtService.sign(payload),
      user,
    };
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
