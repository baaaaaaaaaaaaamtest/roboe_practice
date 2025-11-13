import { Module } from '@nestjs/common';
import {RobotsController} from "./robot.controller";


@Module({
  imports: [],
  providers: [],
  controllers: [RobotsController],
})
export class RobotsModule {}