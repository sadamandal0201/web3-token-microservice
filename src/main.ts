import { NestFactory } from '@nestjs/core';
import { TokenInfoModule } from './token-info/token-info.module';

async function bootstrap() {
  const app = await NestFactory.create(TokenInfoModule);
  await app.listen(8001);
}
bootstrap();
