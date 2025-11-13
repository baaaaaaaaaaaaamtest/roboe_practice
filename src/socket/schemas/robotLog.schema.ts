import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({collection: 'RobotLog'})
export class RobotLog {

  @Prop({ required: true })
  robotId: string;

  @Prop({
    required: true,
    enum: ['status_change', 'error', 'task_complete'],
  })
  eventType: string;

  @Prop({ required: true })
  message: string;

  @Prop({ type: Date, default: Date.now })
  timestamp: Date;
}
export type RobotLogDocument = RobotLog & Document;

export const RobotLogSchema = SchemaFactory.createForClass(RobotLog);
