import { IsIn } from 'class-validator';

export class UpdateRobotStatusDto {
  @IsIn(['idle', 'working', 'error', 'offline'])
  readonly status: 'idle' | 'working' | 'error' | 'offline';
}
