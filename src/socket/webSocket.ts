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
import { CreateRobotLogDto } from './dto/createRobotLog.dto';

@WebSocketGateway({ cors: true }) // 옵션으로 CORS 설정 가능
export class WebSocket implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger = new Logger('ChatGateway');

  @SubscribeMessage('chat')
  handleChatMessage(@MessageBody() dto: CreateRobotLogDto) {
    console.log(dto)
    this.server.emit('chat', dto); // 모든 클라이언트에게 메시지 브로드캐스트
  }

  handleConnection(client: Socket) {
    this.logger.log(`클라이언트 연결됨: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`클라이언트 연결 종료: ${client.id}`);
  }
}