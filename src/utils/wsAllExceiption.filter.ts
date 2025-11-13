import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';

@Catch()
export class WsAllExceptionsFilter extends BaseWsExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    // WebSocket 클라이언트 소켓 가져오기
    const client = host.switchToWs().getClient();

    // 예외에 따라 적절한 메시지와 상태를 보낼 수 있음
    // 기본적으로 예외 메시지를 클라이언트에 'exception' 이벤트로 전송
    client.emit('exception', {
      statusCode: (exception as any).getStatus ? (exception as any).getStatus() : 500,
      message: (exception as any).message || 'Internal server error',
      // 필요시 추가 정보 포함 가능
    });

    // 추가 로깅 등 비즈니스 로직 가능
    console.error('WebSocket Exception:', exception);
  }
}
