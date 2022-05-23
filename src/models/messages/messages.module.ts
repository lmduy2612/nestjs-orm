import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MessagesService } from './messages.service';
import { MessagesRepository } from './messages.repository';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([MessagesRepository])],
  providers: [MessagesService, ConfigModule],
  exports: [MessagesService],
})
export class MessagesModule {}
