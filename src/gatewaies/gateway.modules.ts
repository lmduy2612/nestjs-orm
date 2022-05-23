import { Module } from '@nestjs/common';
import { UsersModule } from '../models/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '../models/users/users.repository';
import { UsersService } from '../models/users/users.service';
import { DevicesModule } from '../models/devices/devices.module';
import { ConversationModule } from '../models/conversation/conversation.module';
import { MessagesModule } from '../models/messages/messages.module';
import { AppGateway } from './app.gateway';
import { JwtModule } from '@nestjs/jwt';
import { EXPIRES_TIME, JWT_SECRET_KEY } from '../config/constants';

@Module({
  imports: [
    UsersModule,
    DevicesModule,
    ConversationModule,
    MessagesModule,
    TypeOrmModule.forFeature([UsersRepository]),
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: EXPIRES_TIME },
    }),
  ],
  providers: [AppGateway, UsersService],
  controllers: [],
})
export class GatewayModules {}
