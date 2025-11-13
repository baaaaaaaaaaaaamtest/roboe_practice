import { Injectable, NotFoundException } from '@nestjs/common';
import {CreateRobotDto} from "./dto/createRobot.dto";
import {UpdateRobotStatusDto} from "./dto/updateRobotStatus.dto";
import { RobotRepository } from './robot.repository';
import { Robot } from './schemas/robot.schema';

@Injectable()
export class RobotService {
  constructor(private readonly repository: RobotRepository) {}

  async findAll(){
    return await this.repository.findAll();
  }

  async findById(id:string){
    return await this.repository.findById(id)
  }

  async createRobot(createRobotDto: CreateRobotDto){
    return await this.repository.createRobot(createRobotDto);
  }

  async updateRobotStatus(id: string, updateDto: UpdateRobotStatusDto): Promise<Robot> {
    return await this.repository.updateRobotStatus(id, updateDto);
  }
  async deleteById(id:string){
    return await this.repository.deleteById(id);
  }
}