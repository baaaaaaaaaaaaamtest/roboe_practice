import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { SocketMessagesDto } from './dto/socketMessages.dto';
import { WebSocketService } from './webSocket.service';

@WebSocketGateway({ cors: true }) // 옵션으로 CORS 설정 가능
export class WebSocket implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly service: WebSocketService) {}

  @WebSocketServer()
  server: Server;

  private logger = new Logger('ChatGateway');

  @SubscribeMessage('chat')
  handleChatMessage(@MessageBody() dto: SocketMessagesDto) {
    // message save
    this.service.createRobotLog(dto,this.server)
    // message broadcast
    // this.server.emit('chat', dto);
  }

  handleConnection(client: Socket) {
    this.logger.log(`클라이언트 연결됨: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`클라이언트 연결 종료: ${client.id}`);
  }
}