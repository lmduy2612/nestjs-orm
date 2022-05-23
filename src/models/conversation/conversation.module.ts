import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConversationService } from './conversation.service';
import { ConversationRepository } from './conversation.repository';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([ConversationRepository])],
  providers: [ConversationService, ConfigModule],
  exports: [ConversationService],
})
export class ConversationModule {}
