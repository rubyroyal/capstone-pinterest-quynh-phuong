import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ImageService } from './image/image.service';
import { ImageController } from './image/image.controller';
import { ImageModule } from './image/image.module';
import { APP_PIPE } from '@nestjs/core';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { classToPlain } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service.js';
import { UserService } from './user/user.service';
@Module({
  imports: [UserModule, AuthModule, ImageModule],
  controllers: [AppController, UserController, AuthController, ImageController],
  providers: [
    AppService,
    ImageService,
    UserService,
    PrismaService,

    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
          strategy: 'excludeAll',
        },
        transformResponse: (errors) => {
          return {
            message: 'Validation failed',
            errors: errors.map((error) => ({
              property: error.property,
              constraints: error.constraints,
            })),
          };
        },
      }),
    },
  ],
})
export class AppModule {}
