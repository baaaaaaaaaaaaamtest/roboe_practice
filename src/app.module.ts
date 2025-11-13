import { Module } from '@nestjs/common';
import { RobotsModule } from './robot/robot.module';

@Module({
  imports: [RobotsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
