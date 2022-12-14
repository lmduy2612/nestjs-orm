import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { UserSerializer } from './serializers/user.serializer';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/CreateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
  ) {}

  async findAll(
    relations: string[] = [],
    throwsException = false,
  ): Promise<UserSerializer[]> {
    return await this.usersRepository.getAllEntity(relations, throwsException);
  }

  async findById(
    id: number,
    relations: string[] = [],
    throwsException = false,
  ): Promise<UserSerializer> {
    return await this.usersRepository.getEntityById(
      id,
      relations,
      throwsException,
    );
  }

  async geUsersByEmail(email: string): Promise<UserSerializer[]> {
    return await this.usersRepository.getUsersByEmail(email);
  }

  async getUserByEmail(email: string): Promise<UserSerializer> {
    return await this.usersRepository.getUserByEmail(email);
  }

  async create(inputs: CreateUserDto): Promise<UserSerializer> {
    return await this.usersRepository.createEntity(inputs);
  }

  async update(user: UserSerializer, inputs: User): Promise<UserSerializer> {
    return await this.usersRepository.updateEntity(user, inputs);
  }

  async deleteById(id: number): Promise<boolean> {
    return await this.usersRepository.deleteEntityById(id);
  }
}
