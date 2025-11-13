import {
  IsString,
  IsNumber,
  IsObject,
  IsOptional,
  IsIn,
  IsDate,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRobotDto {
  @ApiProperty({ example: 'test-robot', description: '로봇 고유 ID' })
  @IsString()
  readonly _id: string;

  @IsString()
  @ApiProperty({ example: 'moveRobot', description: '로봇 이름' })
  readonly name: string;

  @IsString()
  @ApiProperty({ example: 'AA-900', description: '로봇 모델명' })
  readonly model: string;

  @ApiProperty({ example: 'idle', description: '로봇 상태', enum: ['idle', 'working', 'error', 'offline'] })
  @IsIn(['idle', 'working', 'error', 'offline'])
  readonly status: 'idle' | 'working' | 'error' | 'offline';

  @ApiProperty({ example: 100, description: '배터리 잔량(퍼센트)' })
  @IsNumber()
  @Max(100)
  @Min(0)
  readonly battery: number;

  @ApiProperty({ example: { x: 10, y: 20, z: 5 }, description: '로봇 위치 좌표' })
  @IsObject()
  readonly position: { x: number; y: number; z: number };

  @ApiProperty({ example: '2025-11-14T02:00:00.000Z', description: '마지막 연결 시간', required: false })
  @IsDate()
  @Type(() => Date)
  lastConnected?: Date;
}
