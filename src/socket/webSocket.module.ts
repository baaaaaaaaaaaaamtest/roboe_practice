import { Module } from '@nestjs/common';
import { WebSocket } from './webSocket';
import { MongooseModule } from '@nestjs/mongoose';
import { RobotLog, RobotLogSchema } from './schemas/robotLog.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: RobotLog.name, schema: RobotLogSchema },
  ]),],
  providers: [WebSocket],
})
export class WebSocketModule {}
