import { Module } from '@nestjs/common';
import { WebSocket } from './webSocket';
import { MongooseModule } from '@nestjs/mongoose';
import { RobotLog, RobotLogSchema } from './schemas/robotLog.schema';
import { WebSocketService } from './webSocket.service';
import { WebSocketRepository } from './webSocket.repository';
import { Robot, RobotSchema } from '../robot/schemas/robot.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Robot.name, schema: RobotSchema },
    { name: RobotLog.name, schema: RobotLogSchema },
  ]),],
  providers: [WebSocket, WebSocketService,WebSocketRepository],
})
export class WebSocketModule {}
