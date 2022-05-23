import { EntityRepository } from 'typeorm';
import { Devices } from './entities/devices.entity';
import { ModelRepository } from '../model.repository';
import { DevicesSerializer } from './serializers/devices.serializer';
import { instanceToPlain, plainToInstance } from 'class-transformer';

@EntityRepository(Devices)
export class DevicesRepository extends ModelRepository<
  Devices,
  DevicesSerializer
> {
  transform(model: Devices): DevicesSerializer {
    const transformOptions = {};
    return plainToInstance(
      DevicesSerializer,
      instanceToPlain(model, transformOptions),
      transformOptions,
    );
  }

  transformMany(models: Devices[]): DevicesSerializer[] {
    return models.map((model) => this.transform(model));
  }
}
