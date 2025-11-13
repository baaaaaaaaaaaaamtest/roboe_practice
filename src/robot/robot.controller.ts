import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from "@nestjs/common";
import {CreateRobotDto} from "./dto/createRobot.dto";
import {UpdateRobotStatusDto} from "./dto/updateRobotStatus.dto";
import { RobotService } from './robot.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('robots')  // Swagger UI에서 그룹핑 위한 태그
@Controller('robots')
export class RobotController {
  constructor(private readonly service: RobotService) {}

  @Get()
  @ApiOperation({ summary: '모든 로봇 목록 조회' })
  @ApiResponse({ status: 200, description: '로봇 목록 반환' })
  async findAll() {
    return await this.service.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 로봇 조회' })
  @ApiParam({ name: 'id', description: '로봇 고유 ID' })
  @ApiResponse({ status: 200, description: '로봇 데이터 반환' })
  async getRobotOne(@Param('id') id: string) {
    return await this.service.findById(id)
  }

  @Post()
  @ApiOperation({ summary: '로봇 생성' })
  @ApiBody({ type: CreateRobotDto })
  @ApiResponse({ status: 201, description: '로봇 생성 성공' })
  async create(@Body() createRobotDto: CreateRobotDto) {
    return await this.service.createRobot(createRobotDto)
  }

  @Patch(':id/status')
  @ApiOperation({ summary: '로봇 상태 업데이트' })
  @ApiParam({ name: 'id', description: '로봇 ID' })
  @ApiBody({ type: UpdateRobotStatusDto })
  @ApiResponse({ status: 200, description: '로봇 상태 업데이트 성공' })
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateRobotStatusDto,
  ) {
    return await this.service.updateRobotStatus(id, updateStatusDto)
  }


  @Delete(':id')
  @ApiOperation({ summary: '로봇 삭제' })
  @ApiParam({ name: 'id', description: '로봇 ID' })
  @ApiResponse({ status: 200, description: '로봇 삭제 성공' })
  async deleteById(@Param('id') id: string) {
    return await this.service.deleteById(id)
  }
}
