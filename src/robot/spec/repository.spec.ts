import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { RobotRepository } from '../robot.repository';
import { Robot, RobotSchema } from '../schemas/robot.schema';
import { CreateRobotDto } from '../dto/createRobot.dto';
import { UpdateRobotStatusDto } from '../dto/updateRobotStatus.dto';
import * as dotenv from 'dotenv';
dotenv.config();

const cDto:CreateRobotDto = {
  "_id": "RBT-00",
  "name": "HelperBot",
  "model": "HB-X200",
  "status": "idle",
  "battery": 85,
  "position": {
    "x": 12.5,
    "y": 7.8,
    "z": 1.2
  },
  // @ts-ignore
  "lastConnected": "2025-11-13T00:00:00.000Z"
}


describe('RobotRepository (e2e)', () => {
  let repository: RobotRepository;
  let connection: Connection;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // @ts-ignore
        MongooseModule.forRoot(process.env.MONGODB_URI),
        MongooseModule.forFeature([{ name: Robot.name, schema: RobotSchema }]),
      ],
      providers: [RobotRepository],
    }).compile();

    repository = module.get<RobotRepository>(RobotRepository);
    connection = await module.get(getConnectionToken());
  });



  it('createRobot should create and return robot', async () => {
    const robot = await repository.createRobot(cDto);
    console.log(robot)
    expect(robot).toBeDefined();
    expect(robot.status).toBe(cDto.status);
  });

  it('findAll should return all robots', async () => {
    const robots = await repository.findAll();
    console.log(robots)
    expect(Array.isArray(robots)).toBe(true);
    expect(robots.length).toBeGreaterThan(0);
  });

  it('findById should return robot by id', async () => {
    const robots = await repository.findAll();
    const robot = await repository.findById(robots[0]._id.toString());
    console.log(robot)
    expect(robot).toBeDefined();
    // @ts-ignore
    expect(robot._id.toString()).toBe(robots[0]._id.toString());
  });

  it('updateRobotStatus should update status', async () => {
    const robots = await repository.findAll();
    const dto: UpdateRobotStatusDto = { status: 'error' };
    const robot = await repository.updateRobotStatus(robots[0]._id.toString(), dto);
    console.log(robot)
    expect(robot.status).toBe(dto.status);
  });

  it('deleteById should delete robot', async () => {
    const robots = await repository.findAll();
    const id = robots[0]._id.toString();
    const deletedId = await repository.deleteById(id);
    expect(deletedId).toBe(id);

    await expect(repository.findById(id)).rejects.toThrow(NotFoundException);
  });

  afterAll(async () => {
    // await connection.dropDatabase(); //초기화
    await connection.close();
  });
});
