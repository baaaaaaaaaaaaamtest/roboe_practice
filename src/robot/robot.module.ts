import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {Robot, RobotSchema} from "./schemas/robot.schema";
import {RobotLog, RobotLogSchema} from "./schemas/robotLog.schema";
import { RobotController } from './robot.controller';
import { RobotService } from './robot.service';
import { RobotRepository } from './robot.repository';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Robot.name, schema: RobotSchema },
    { name: RobotLog.name, schema: RobotLogSchema },
  ]),],
  providers: [RobotService,RobotRepository],
  controllers: [RobotController],
})
export class RobotModule {}