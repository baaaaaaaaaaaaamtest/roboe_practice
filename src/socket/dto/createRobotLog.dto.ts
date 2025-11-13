import { IsEnum, IsOptional, IsString } from 'class-validator';


export class CreateRobotLogDto {
  @IsString()
  readonly robotId: string;

  @IsEnum(['status_change', 'error', 'task_complete'])
  readonly eventType: 'status_change' | 'error' | 'task_complete';

  @IsString()
  readonly message: string;

  @IsOptional()
  timestamp?: Date;
}