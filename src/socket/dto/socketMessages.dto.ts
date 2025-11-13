import {
  IsString,
  IsEnum,
  IsOptional,
  IsDateString,
  IsIn,
  IsNumber,
  IsObject,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class SocketMessagesDto {

  @Expose()
  @IsString()
  readonly robotId: string;

  @Expose()
  @IsIn(['idle', 'working', 'error', 'offline'])
  readonly status: 'idle' | 'working' | 'error' | 'offline';

  @Expose()
  @IsNumber()
  readonly battery: number;

  @Expose()
  @IsObject()
  readonly position: { x: number; y: number; z: number };

  @Expose()
  @IsEnum(['status_change', 'error', 'task_complete'])
  readonly eventType: 'status_change' | 'error' | 'task_complete';

  @Expose()
  @IsString()
  readonly message: string;

}
