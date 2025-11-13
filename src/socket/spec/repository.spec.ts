import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import  { Connection } from 'mongoose';
import { WebSocketRepository } from '../webSocket.repository';
import { Robot, RobotSchema } from '../../robot/schemas/robot.schema';
import { RobotLog, RobotLogSchema } from '../schemas/robotLog.schema';
import { CreateRobotLogDto } from '../dto/createRobotLog.dto';
import { UpdateRobotDto } from '../dto/updateRobot.dto';
import * as dotenv from 'dotenv';
dotenv.config();


const createDto : CreateRobotLogDto ={
  robotId:'test-robot',
  eventType:'task_complete',
  message:'작업완료',
}
const updateDto : UpdateRobotDto = {
  _id:'test-robot',
  status:'working',
  battery:85,
  position:{x:1,y:2,z:3}
}

const findById :string = 'test-robot'

describe('WebSocketRepository (integration)', () => {
  let repository: WebSocketRepository;
  let connection: Connection;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // @ts-ignore
        MongooseModule.forRoot(process.env.MONGODB_URI),
        MongooseModule.forFeature([
          { name: Robot.name, schema: RobotSchema },
          { name: RobotLog.name, schema: RobotLogSchema },
        ]),
      ],
      providers: [WebSocketRepository],
    }).compile();

    repository = module.get<WebSocketRepository>(WebSocketRepository);
    connection = await module.get(getConnectionToken());
  });

  afterAll(async () => {
    // await connection.dropDatabase(); //초기화
    await connection.close();
  });

  it('should create robot logs', async () => {
    const log = await repository.createRobotLog(createDto);
    console.log(log)
    expect(log).toHaveProperty('_id');
  })
  it('should find', async () => {
    // findById 테스트
    const foundRobot = await repository.findById(findById);
    expect(foundRobot.status).toBe('idle');

  });

  it('update check', async () => {
    const updatedRobot = await repository.updateRobotStatus(updateDto._id, updateDto as any);
    expect(updatedRobot.status).toBe('working');
  });
});
