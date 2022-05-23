import { IConversation } from '../interfaces/conversation.interface';
import { ModelSerializer } from '../../model.serializer';

export class ConversationSerializer
  extends ModelSerializer
  implements IConversation
{
  id: number;

  title: string;

  description: string;

  createdAt: Date;

  updatedAt: Date;
}
