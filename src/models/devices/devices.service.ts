import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DevicesSerializer } from './serializers/devices.serializer';
import { Devices } from './entities/devices.entity';
import { DevicesRepository } from './devices.repository';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(DevicesRepository)
    private devicesRepository: DevicesRepository,
  ) {}

  async findAll(
    relations: string[] = [],
    throwsException = false,
  ): Promise<DevicesSerializer[]> {
    return await this.devicesRepository.getAllEntity(
      relations,
      throwsException,
    );
  }

  async findById(
    id: number,
    relations: string[] = [],
    throwsException = false,
  ): Promise<DevicesSerializer> {
    return await this.devicesRepository.getEntityById(
      id,
      relations,
      throwsException,
    );
  }

  async create(inputs: Devices): Promise<DevicesSerializer> {
    return await this.devicesRepository.createEntity(inputs);
  }

  async update(
    device: DevicesSerializer,
    inputs: Devices,
  ): Promise<DevicesSerializer> {
    return await this.devicesRepository.updateEntity(device, inputs);
  }

  async deleteById(id: number): Promise<boolean> {
    return await this.devicesRepository.deleteEntityById(id);
  }
}
