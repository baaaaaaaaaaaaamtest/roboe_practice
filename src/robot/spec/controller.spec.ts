import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Robot, RobotSchema } from '../schemas/robot.schema';
import { RobotLog, RobotLogSchema } from '../../socket/schemas/robotLog.schema';
import { RobotService } from '../robot.service';
import { RobotRepository } from '../robot.repository';
import { RobotController } from '../robot.controller';

describe('RobotsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [MongooseModule.forFeature([
        { name: Robot.name, schema: RobotSchema },
        { name: RobotLog.name, schema: RobotLogSchema },
      ]),],
      providers: [RobotService,RobotRepository],
      controllers: [RobotController],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it('/robots (GET)', async () => {
    await request(app.getHttpServer())
      .get('/robots')
      .expect(200)
      .expect('findAll');
  });

  it('/robots/:id/logs (GET)', async () => {
    const testId = 'test-robot';
    const result = await request(app.getHttpServer())
      .get(`/robots/${testId}/logs`)
      .expect(200)
      .expect(testId);
    console.log (result)
  });

  it('/robots (POST)', async () => {
    await request(app.getHttpServer())
      .post('/robots')
      .send({ name: 'TestBot', model: 'X1' })
      .expect(201)
      .expect({ name: 'TestBot', model: 'X1' });
  });

  it('/robots/:id/status (PATCH)', () => {
    const testId = '123';
    const updateStatusDto = { status: 'active' };

    return request(app.getHttpServer())
      .patch(`/robots/${testId}/status`)
      .send(updateStatusDto)
      .expect(200)
      .expect({ id: testId, updateStatusDto });
  });

  it('/robots/:id (DELETE)', () => {
    const testId = '456';

    return request(app.getHttpServer())
      .delete(`/robots/${testId}`)
      .expect(200)
      .expect(testId);
  });

  afterAll(async () => {
    await app.close();
  });
});
