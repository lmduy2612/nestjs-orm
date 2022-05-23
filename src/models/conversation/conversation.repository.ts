import { EntityRepository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { ModelRepository } from '../model.repository';
import { ConversationSerializer } from './serializers/conversation.serializer';
import { instanceToPlain, plainToInstance } from 'class-transformer';

@EntityRepository(Conversation)
export class ConversationRepository extends ModelRepository<
  Conversation,
  ConversationSerializer
> {
  transform(model: Conversation): ConversationSerializer {
    const transformOptions = {};
    return plainToInstance(
      ConversationSerializer,
      instanceToPlain(model, transformOptions),
      transformOptions,
    );
  }

  transformMany(models: Conversation[]): ConversationSerializer[] {
    return models.map((model) => this.transform(model));
  }
}
