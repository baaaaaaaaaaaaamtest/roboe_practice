import { IsString, IsEnum, IsOptional, IsDateString } from 'class-validator';

export class CreateRobotLogDto {
  @IsOptional()
  _id?: string;

  @IsString()
  robotId: string;

  @IsEnum(['status_change', 'error', 'task_complete'])
  eventType: 'status_change' | 'error' | 'task_complete';

  @IsString()
  message: string;

  @IsOptional()
  timestamp?: Date;
}
