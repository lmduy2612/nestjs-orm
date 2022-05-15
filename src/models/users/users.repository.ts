import { EntityRepository } from 'typeorm';
import { User } from './entities/user.entity';
import { ModelRepository } from '../model.repository';
import { UserSerializer } from './serializers/user.serializer';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(User)
export class UsersRepository extends ModelRepository<User, UserSerializer> {
  async getUsersByEmail(email: string): Promise<UserSerializer[]> {
    return this.find({
      where: {
        email: email,
      },
    }).then((entity) => {
      if (!entity) {
        return Promise.reject(new NotFoundException('Model not found'));
      }

      return Promise.resolve(entity ? this.transformMany(entity) : null);
    });
  }

  async getUserByEmail(email: string): Promise<UserSerializer> {
    return await this.findOne({
      where: { email: email },
    }).then((entity) => {
      if (!entity) {
        return Promise.reject(new NotFoundException('Model not found'));
      }

      return Promise.resolve(entity ? this.transform(entity) : null);
    });
  }

  transform(model: User): UserSerializer {
    const transformOptions = {};
    return plainToInstance(
      UserSerializer,
      instanceToPlain(model, transformOptions),
      transformOptions,
    );
  }

  transformMany(models: User[]): UserSerializer[] {
    return models.map((model) => this.transform(model));
  }
}
