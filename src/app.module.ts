import { Module } from '@nestjs/common';
import {RobotModule} from "./robot/robot.module";
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { WebSocketModule } from './socket/webSocket.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true }),
    // @ts-ignore
    MongooseModule.forRoot(process.env.MONGODB_URI),
    RobotModule,
    WebSocketModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
