import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from "@nestjs/common";
import {CreateRobotDto} from "./dto/createRobot.dto";
import {UpdateRobotStatusDto} from "./dto/updateRobotStatus.dto";


@Controller('robots')
export class RobotsController {

  @Get()
  async findAll() {
    return 'findAll'
  }

  @Get(':id')
  async getRobotOne(@Param('id') id: string) {
    return id
  }

  @Post()
  async create(@Body() createRobotDto: CreateRobotDto) {
    return createRobotDto
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateRobotStatusDto,
  ) {
    return {id,updateStatusDto}
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return id
  }
}
