import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaClient } from '@prisma/client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prisma = new PrismaClient();

  // Enable CORS
  app.enableCors();

  // Create Swagger API documentation
  const config = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('Your API Description')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start the app
  await app.listen(3000);

  // Close Prisma client on app shutdown
  app.enableShutdownHooks();
  app.use(async () => {
    await prisma.$disconnect();
  });
}
bootstrap();
