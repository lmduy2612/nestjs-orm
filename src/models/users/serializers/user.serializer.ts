import { IUser } from '../interfaces/user.interface';
import { ModelSerializer } from '../../model.serializer';

export class UserSerializer extends ModelSerializer implements IUser {
  id: number;

  email: string;

  name: null | string;

  password: string;

  createdAt: Date;

  updatedAt: Date;
}
