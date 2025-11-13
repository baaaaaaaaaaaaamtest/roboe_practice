import { BadRequestException, Injectable } from '@nestjs/common';
import { SocketMessagesDto } from './dto/socketMessages.dto';
import { WebSocketRepository } from './webSocket.repository';
import { CreateRobotLogDto } from './dto/createRobotLog.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateRobotDto } from './dto/updateRobot.dto';
import { validateSync } from 'class-validator';

@Injectable()
export class WebSocketService {
  constructor(private readonly repository: WebSocketRepository) {}

  async createRobotLog(dto: SocketMessagesDto){
    const createRobotLogDto = this.mapToRobotLogDto(dto);
    const updateRobotDto = this.mapToRobotDto(dto);

    await this.repository.createRobotLog(createRobotLogDto);
    const robot = await this.repository.findById(updateRobotDto._id)
    let result = await this.repository.updateRobotStatus(updateRobotDto._id,updateRobotDto);
    let bool = updateRobotDto.status === robot.status;

    return {result,bool}
  }


  mapToRobotLogDto = (dto :SocketMessagesDto) => {
    const _dto =  plainToInstance(CreateRobotLogDto, {
      robotId: dto.robotId,
      eventType:dto.eventType,
      message:dto.message
    });
    const errors = validateSync(_dto)
    if (errors.length > 0) {
      // 유효성 검사 실패 - 적절한 에러 처리 (예: 예외 throw)
      throw new BadRequestException(errors);
    }
    return _dto
  }

  mapToRobotDto = (dto :SocketMessagesDto) => {
    const _dto =  plainToInstance(UpdateRobotDto, {
      _id: dto.robotId,
      status:dto.status,
      battery:dto.battery,
      position:dto.position,
    });
    const errors = validateSync(_dto)
    if (errors.length > 0) {
      // 유효성 검사 실패 - 적절한 에러 처리 (예: 예외 throw)
      throw new BadRequestException(errors);
    }
    return _dto
  }
}