import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { APIResponseInterceptor } from './common/interceptors/api-response.interceptor';
import { HttpExceptionFilter } from './common/interceptors/http-exception.filter.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // disableErrorMessages: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new APIResponseInterceptor());

  app.setGlobalPrefix('api/v1');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
