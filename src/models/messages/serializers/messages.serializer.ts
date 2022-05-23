import { IMessage } from '../interfaces/messages.interface';
import { ModelSerializer } from '../../model.serializer';

export class MessagesSerializer extends ModelSerializer implements IMessage {
  id: number;

  user_id: number;

  conversation_id: number;

  message: string;

  createdAt: Date;

  updatedAt: Date;
}
