import { Module } from '@nestjs/common';
import {RobotModule} from "./robot/robot.module";
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // @ts-ignore
    MongooseModule.forRoot(process.env.MONGODB_URI),
    RobotModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
