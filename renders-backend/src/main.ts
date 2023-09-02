import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { WsAdapter } from '@nestjs/platform-ws';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options: CorsOptions = {
    origin: [
      'http://localhost:4200',
      'https://renders-design.studio',
      'https://www.renders-design.studio',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    // optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: 'Content-Type, Accept',
  };
  app.enableCors(options);

  // global prefix
  app.setGlobalPrefix('api/v1');

  // websocket
  app.use(cookieParser());
  app.useWebSocketAdapter(new WsAdapter(app));

  // start server
  await app.listen(3000);
}
bootstrap();
