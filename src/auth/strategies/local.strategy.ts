import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserSerializer } from '../../models/users/serializers/user.serializer';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<UserSerializer> {
    const user = await this.authService.authentication(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
