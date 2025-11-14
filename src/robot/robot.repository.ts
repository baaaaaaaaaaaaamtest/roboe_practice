import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model,Types } from 'mongoose';
import { Robot, RobotDocument } from './schemas/robot.schema';
import {CreateRobotDto} from "./dto/createRobot.dto";
import { UpdateRobotStatusDto } from './dto/updateRobotStatus.dto';
import { RobotLog, RobotLogDocument } from '../socket/schemas/robotLog.schema';

@Injectable()
export class RobotRepository {
  constructor(
    @InjectModel(Robot.name) private readonly robotModel: Model<RobotDocument>,
    @InjectModel(RobotLog.name) private readonly robotLogModel: Model<RobotLogDocument>
  ) {}

  async findAll(): Promise<Robot[]> {
    return await this.robotModel.find().exec();
  }


  async findById(id: string): Promise<Robot | null> {
    const result = await this.robotModel.findOne({ _id: id }).exec();
    if (!result) {
      throw new NotFoundException(`Robot with id ${id} not found`);
    }
    return result;
  }

  async findLogById(id: string): Promise<RobotLog[] | null> {
    const result = await this.robotLogModel.find({ robotId: id }).exec();
    if (!result) {
      throw new NotFoundException(`RobotLog with id ${id} not found`);
    }
    return result;
  }

  async createRobot(createRobotDto: CreateRobotDto): Promise<Robot> {
    try {
      const result = new this.robotModel({
        ...createRobotDto,
        createdAt: new Date(),
      });
      return await result.save();
    } catch (error) {
      throw new InternalServerErrorException(`Failed to create robot: ${error.message}`);
    }
  }

  async updateRobotStatus(id: string, updateStatusDto: UpdateRobotStatusDto): Promise<Robot> {
    const result = await this.robotModel.findByIdAndUpdate(
      id,
      { $set: { status: updateStatusDto.status } },
      { new: true }
    ).exec();

    if (!result) {
      throw new NotFoundException(`Robot with id ${id} not found`);
    }
    return result;
  }

  async deleteById(id: string): Promise<string> {
    const result = await this.robotModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Robot with id ${id} not found`);
    }
    return result.id;
  }
}
