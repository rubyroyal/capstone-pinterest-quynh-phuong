import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix for all routes
  app.setGlobalPrefix('api');

  // Validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // CORS configuration
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    allowedHeaders: 'Content-Type,Authorization',
    exposedHeaders: 'Content-Disposition',
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Dự án Pinterest')
    .setDescription('Đặc tả API')
    .setVersion('1.0')
    .addBearerAuth()
    .addApiKey({ type: 'apiKey', in: 'body', name: 'email' }, 'email')
    .addApiKey({ type: 'apiKey', in: 'body', name: 'pass_word' }, 'pass_word')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
