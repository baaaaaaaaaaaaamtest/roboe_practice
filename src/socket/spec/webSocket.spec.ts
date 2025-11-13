import { io, Socket } from 'socket.io-client';
import { CreateRobotLogDto } from '../dto/createRobotLog.dto';


const testRobotLogDto: CreateRobotLogDto = {
  robotId: 'robot-001',
  eventType: 'status_change',  // 'status_change', 'error', 'task_complete' 중 하나
  message: 'Hello from Jest test!',
  // timestamp는 optional이므로 생략 가능
};

describe('ChatGateway WebSocket 테스트', () => {
  let socket: Socket;

  beforeAll((done) => {
    // 실제 NestJS 서버가 3000번에서 실행 중이어야 함
    socket = io('http://localhost:3000', { transports: ['websocket'] });

    socket.on('connect', () => {
      done();
    });
  });

  afterAll(() => {
    if (socket.connected) {
      socket.disconnect();
    }
  });

  it('서버에 chat 이벤트 전송 후 브로드캐스트 받기', (done) => {
    const testMessage = testRobotLogDto

    socket.on('chat', (payload) => {
      try {
        expect(payload).toEqual({
          robotId: testRobotLogDto.robotId,
          eventType: testRobotLogDto.eventType,  // 'status_change', 'error', 'task_complete' 중 하나
          message: testRobotLogDto.message,
        });
        done();
      } catch (err) {
        done(err);
      }
    });

    socket.emit('chat', testMessage);
  });
});
