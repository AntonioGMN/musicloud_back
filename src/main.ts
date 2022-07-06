import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DomainExceptionFilter } from './infra/http/domain-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new DomainExceptionFilter());
  app.enableCors({
    origin: '*',
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
