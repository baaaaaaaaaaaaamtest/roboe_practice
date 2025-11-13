import { Injectable } from '@nestjs/common';
import { SocketMessagesDto } from './dto/socketMessages.dto';
import { WebSocketRepository } from './webSocket.repository';
import { CreateRobotLogDto } from './dto/createRobotLog.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateRobotDto } from './dto/updateRobot.dto';
import { Server } from 'socket.io';

@Injectable()
export class WebSocketService {
  constructor(private readonly repository: WebSocketRepository) {}


  async createRobotLog(dto: SocketMessagesDto,server:Server){
    const createRobotLogDto = this.mapToRobotLogDto(dto);
    const updateRobotDto = this.mapToRobotDto(dto);

    await this.repository.createRobotLog(createRobotLogDto);
    const robot = await this.repository.findById(updateRobotDto._id)
    if ( updateRobotDto.status === robot.status)
      await this.repository.updateRobotStatus(updateRobotDto._id,updateRobotDto);
    else {
      let result = await this.repository.updateRobotStatus(updateRobotDto._id,updateRobotDto);
      server.emit('chat',result)
    }
    return
  }


  mapToRobotLogDto = (dto :SocketMessagesDto) => {
    return plainToInstance(CreateRobotLogDto, {
      robotId: dto.robotId,
      eventType:dto.eventType,
      message:dto.message
    });
  }

  mapToRobotDto = (dto :SocketMessagesDto) => {
    return plainToInstance(UpdateRobotDto, {
      _id: dto.robotId,
      status:dto.status,
      battery:dto.battery,
      position:dto.position,
    });
  }
}