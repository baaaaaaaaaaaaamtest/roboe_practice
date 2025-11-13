import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseFilters } from '@nestjs/common';
import { SocketMessagesDto } from './dto/socketMessages.dto';
import { WebSocketService } from './webSocket.service';
import { WsAllExceptionsFilter } from '../utils/wsAllExceiption.filter';

@UseFilters(new WsAllExceptionsFilter())
@WebSocketGateway({ cors: true }) // 옵션으로 CORS 설정 가능
export class WebSocket implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly service: WebSocketService) {}

  @WebSocketServer()
  server: Server;

  private logger = new Logger('ChatGateway');

  @SubscribeMessage('chat')
  async handleChatMessage(@MessageBody() dto: SocketMessagesDto) {
    // message save
    const response = await this.service.createRobotLog(dto)
    if (!response.bool) this.server.emit('chat',response.result)
  }

  handleConnection(client: Socket) {
    this.logger.log(`클라이언트 연결됨: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`클라이언트 연결 종료: ${client.id}`);
  }
}