import { IsString, IsNumber, IsObject, IsOptional, IsIn, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRobotDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly model: string;

  @IsIn(['idle', 'working', 'error', 'offline'])
  readonly status: 'idle' | 'working' | 'error' | 'offline';

  @IsNumber()
  readonly battery: number;

  @IsObject()
  readonly position: { x: number; y: number; z: number };

  @IsDate()
  @Type(() => Date)
  lastConnected?: Date;
}
