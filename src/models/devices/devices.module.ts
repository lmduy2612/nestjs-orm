import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DevicesService } from './devices.service';
import { DevicesRepository } from './devices.repository';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([DevicesRepository])],
  providers: [DevicesService, ConfigModule],
  exports: [DevicesService],
})
export class DevicesModule {}
