import { IsIn, IsNumber, IsObject, IsString } from 'class-validator';


export class UpdateRobotDto {
  @IsString()
  readonly _id: string;

  @IsIn(['idle', 'working', 'error', 'offline'])
  readonly status: 'idle' | 'working' | 'error' | 'offline';

  @IsNumber()
  readonly battery: number;

  @IsObject()
  readonly position: { x: number; y: number; z: number };
}