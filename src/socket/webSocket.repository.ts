import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RobotLog, RobotLogDocument } from './schemas/robotLog.schema';
import { CreateRobotLogDto } from './dto/createRobotLog.dto';
import { Robot, RobotDocument } from '../robot/schemas/robot.schema';
import { UpdateRobotDto } from './dto/updateRobot.dto';


@Injectable()
export class WebSocketRepository {
  constructor(@InjectModel(RobotLog.name) private readonly robotLogModel: Model<RobotLogDocument>,
              @InjectModel(Robot.name) private readonly robotModel: Model<RobotDocument>) {}

  async createRobotLog(dto: CreateRobotLogDto):Promise<RobotLog> {
    try {
      const result = new this.robotLogModel({
        ...dto,
        timestamp: new Date(),
      });
      return await result.save();
    } catch (error) {
      throw new InternalServerErrorException(`Failed to create robot: ${error.message}`);
    }
  }


  async findById(id: string){
    const existingRobot = await this.robotModel.findById(id).exec();

    if (!existingRobot) {
      throw new NotFoundException(`Robot with id ${id} not found`);
    }
    return existingRobot
  }

  async updateRobotStatus(id: string, dto: UpdateRobotDto) {
    const result = await this.robotModel.findByIdAndUpdate(
      id,
      { $set: dto },
      { new: true }
    ).exec();

    if (!result) {
      throw new NotFoundException(`Robot with id ${id} not found`);
    }
    return result;
  }
}