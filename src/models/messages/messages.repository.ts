import { EntityRepository } from 'typeorm';
import { Messages } from './entities/messages.entity';
import { ModelRepository } from '../model.repository';
import { MessagesSerializer } from './serializers/messages.serializer';
import { instanceToPlain, plainToInstance } from 'class-transformer';

@EntityRepository(Messages)
export class MessagesRepository extends ModelRepository<
  Messages,
  MessagesSerializer
> {
  transform(model: Messages): MessagesSerializer {
    const transformOptions = {};
    return plainToInstance(
      MessagesSerializer,
      instanceToPlain(model, transformOptions),
      transformOptions,
    );
  }

  transformMany(models: Messages[]): MessagesSerializer[] {
    return models.map((model) => this.transform(model));
  }
}
