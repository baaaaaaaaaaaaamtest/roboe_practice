import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({collection: 'Robot'})
export class Robot {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  model: string;

  @Prop({
    required: true,
    enum: ['idle', 'working', 'error', 'offline'],
    default: 'idle',
  })
  status: string;

  @Prop({
    required: true,
    min: 0,
    max: 100,
  })
  battery: number;

  @Prop({
    required: true,
    type: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
      z: { type: Number, required: true },
    },
  })
  position: {
    x: number;
    y: number;
    z: number;
  };

  @Prop({  required: true,type: Date })
  lastConnected: Date;

  @Prop({  required: true, type: Date, default: Date.now })
  createdAt: Date;
}

export type RobotDocument = Robot & Document;

export const RobotSchema = SchemaFactory.createForClass(Robot);
