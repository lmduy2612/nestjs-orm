import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { HttpException, HttpStatus, Logger, UseGuards } from '@nestjs/common';
import { WsGuard } from './guards/validation';
import { MessagesInterface } from './interfaces/messages.interface';
import { UsersService } from '../models/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserSerializer } from '../models/users/serializers/user.serializer';
import { DevicesService } from '../models/devices/devices.service';
import { ConversationService } from '../models/conversation/conversation.service';
import { MessagesService } from '../models/messages/messages.service';

@UseGuards(WsGuard)
@WebSocketGateway(3006, { cors: true })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('MessageGateway');
  constructor(
    private devicesService: DevicesService,
    private conversationService: ConversationService,
    private messagesService: MessagesService,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  afterInit(server: any): any {
    this.logger.log(server, 'Init');
  }

  async handleConnection(client: Socket) {
    this.logger.log(client.id, 'Connected..............................');
    this.logger.log('Create device with user...........................');
    const user = await this.getDataUserFromToken(client);
    const device: any = {
      user_id: user.id,
      client_id: client.id,
    };
    await this.devicesService.create(device);
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(client.id, 'Disconnect..............................');
    this.logger.log('Remove device with user............................');
    const user = await this.getDataUserFromToken(client);
    await this.devicesService.deleteBy(user.id, client.id);
  }

  @SubscribeMessage('messages')
  async messages(client: Socket, payload: MessagesInterface) {
    this.logger.log('Listening event [message]..............................');
    const user = await this.getDataUserFromToken(client);

    // get conversation info
    const conversation = await this.conversationService.findById(
      payload.conversation_id,
      ['users'],
    );

    // create message with conversation
    const message = await this.messagesService.create({
      user_id: user.id,
      conversation_id: conversation.id,
      message: payload.message,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // get list device user of conversation
    const devices = await this.devicesService.findByCondition({
      user_id: user.id,
    });
    devices.map((device) => {
      this.server.to(device.client_id).emit('messages', {
        id: message.id,
        message: message.message,
        conversation_id: message.conversation_id,
        user_id: message.user_id,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
      });
    });

    // client.emit('messages', {
    //   id: message.id,
    //   message: message.message,
    //   conversation_id: message.conversation_id,
    //   user_id: message.user_id,
    //   createdAt: message.createdAt,
    //   updatedAt: message.updatedAt,
    // });

    return message;
  }

  async getDataUserFromToken(client: Socket): Promise<UserSerializer> {
    const authToken: any = client.handshake?.query?.token;
    try {
      const decoded = this.jwtService.verify(authToken);
      return await this.userService.getUserByEmail(decoded.email);
    } catch (ex) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
