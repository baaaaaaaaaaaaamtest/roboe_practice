import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from "@nestjs/common";
import {CreateRobotDto} from "./dto/createRobot.dto";
import {UpdateRobotStatusDto} from "./dto/updateRobotStatus.dto";
import { RobotService } from './robot.service';


@Controller('robots')
export class RobotController {
  constructor(private readonly service: RobotService) {}

  @Get()
  async findAll() {
    return await this.service.findAll()
  }

  @Get(':id')
  async getRobotOne(@Param('id') id: string) {
    return await this.service.findById(id)
  }

  @Post()
  async create(@Body() createRobotDto: CreateRobotDto) {
    return await this.service.createRobot(createRobotDto)
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateRobotStatusDto,
  ) {
    return await this.service.updateRobotStatus(id, updateStatusDto)
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return await this.service.deleteById(id)
  }
}
