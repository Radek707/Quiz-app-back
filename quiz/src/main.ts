import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const options = {
      origin: "https://example.com",
  }

  const app = await NestFactory.create(AppModule , {cors: options});
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
  }));
  await app.listen(3000);
}
bootstrap();
