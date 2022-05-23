import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesSerializer } from './serializers/messages.serializer';
import { Messages } from './entities/messages.entity';
import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessagesRepository)
    private messagesRepository: MessagesRepository,
  ) {}

  async findAll(
    relations: string[] = [],
    throwsException = false,
  ): Promise<MessagesSerializer[]> {
    return await this.messagesRepository.getAllEntity(
      relations,
      throwsException,
    );
  }

  async findById(
    id: number,
    relations: string[] = [],
    throwsException = false,
  ): Promise<MessagesSerializer> {
    return await this.messagesRepository.getEntityById(
      id,
      relations,
      throwsException,
    );
  }

  async create(inputs: any): Promise<MessagesSerializer> {
    return await this.messagesRepository.createEntity(inputs);
  }

  async update(
    device: MessagesSerializer,
    inputs: Messages,
  ): Promise<MessagesSerializer> {
    return await this.messagesRepository.updateEntity(device, inputs);
  }

  async deleteById(id: number): Promise<boolean> {
    return await this.messagesRepository.deleteEntityById(id);
  }
}
