import { IDevices } from '../interfaces/devices.interface';
import { ModelSerializer } from '../../model.serializer';

export class DevicesSerializer extends ModelSerializer implements IDevices {
  id: number;

  client_id: string;

  user_id: number;

  createdAt: Date;

  updatedAt: Date;
}
