// import { Test } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import request from 'supertest';
// import { AppModule } from '../../app.module';
//
// describe('RobotsController (e2e)', () => {
//   let app: INestApplication;
//
//   beforeAll(async () => {
//     const moduleFixture = await Test.createTestingModule({
//       imports: [AppModule], // 실제 모듈 임포트 권장
//     }).compile();
//
//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });
//   it('/robots (GET)', async () => {
//     await request(app.getHttpServer())
//       .get('/robots')
//       .expect(200)
//       .expect('findAll');
//   });
//
//   it('/robots/:id (GET)', () => {
//     const testId = '12345';
//     return request(app.getHttpServer())
//       .get(`/robots/${testId}`)
//       .expect(200)
//       .expect(testId);
//   });
//
//   it('/robots (POST)', async () => {
//     await request(app.getHttpServer())
//       .post('/robots')
//       .send({ name: 'TestBot', model: 'X1' })
//       .expect(201)
//       .expect({ name: 'TestBot', model: 'X1' });
//   });
//
//   it('/robots/:id/status (PATCH)', () => {
//     const testId = '123';
//     const updateStatusDto = { status: 'active' };
//
//     return request(app.getHttpServer())
//       .patch(`/robots/${testId}/status`)
//       .send(updateStatusDto)
//       .expect(200)
//       .expect({ id: testId, updateStatusDto });
//   });
//
//   it('/robots/:id (DELETE)', () => {
//     const testId = '456';
//
//     return request(app.getHttpServer())
//       .delete(`/robots/${testId}`)
//       .expect(200)
//       .expect(testId);
//   });
//
//   afterAll(async () => {
//     await app.close();
//   });
// });
