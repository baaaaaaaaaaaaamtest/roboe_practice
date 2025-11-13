import { IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRobotStatusDto {
  @ApiProperty({
    description: '로봇 상태',
    enum: ['idle', 'working', 'error', 'offline'],
    example: 'idle',
  })
  @IsIn(['idle', 'working', 'error', 'offline'])
  readonly status: 'idle' | 'working' | 'error' | 'offline';
}
