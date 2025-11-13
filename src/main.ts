import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './utils/allException.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new IoAdapter(app)); // socket.io 어댑터 사용 설정
  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 없는 프로퍼티는 자동으로 제거
      //     forbidNonWhitelisted: true, // DTO에 없는 프로퍼티가 있으면 요청 거부 (옵션)
      transform: true, // 요청 바디를 DTO 타입으로 자동 변환
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('API 문서 제목')
    .setDescription('API 설명')
    .setVersion('1.0')
    .addTag('ROBOE_practice')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
