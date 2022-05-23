import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConversationSerializer } from './serializers/conversation.serializer';
import { Conversation } from './entities/conversation.entity';
import { ConversationRepository } from './conversation.repository';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(ConversationRepository)
    private devicesRepository: ConversationRepository,
  ) {}

  async findAll(
    relations: string[] = [],
    throwsException = false,
  ): Promise<ConversationSerializer[]> {
    return await this.devicesRepository.getAllEntity(
      relations,
      throwsException,
    );
  }

  async findById(
    id: number,
    relations: string[] = [],
    throwsException = false,
  ): Promise<ConversationSerializer> {
    return await this.devicesRepository.getEntityById(
      id,
      relations,
      throwsException,
    );
  }

  async create(inputs: Conversation): Promise<ConversationSerializer> {
    return await this.devicesRepository.createEntity(inputs);
  }

  async update(
    device: ConversationSerializer,
    inputs: Conversation,
  ): Promise<ConversationSerializer> {
    return await this.devicesRepository.updateEntity(device, inputs);
  }

  async deleteById(id: number): Promise<boolean> {
    return await this.devicesRepository.deleteEntityById(id);
  }
}
