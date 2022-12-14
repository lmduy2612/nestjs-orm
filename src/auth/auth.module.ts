import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../models/users/users.service';
import { UsersRepository } from '../models/users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EXPIRES_TIME, JWT_SECRET_KEY } from '../config/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: EXPIRES_TIME },
    }),
  ],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
