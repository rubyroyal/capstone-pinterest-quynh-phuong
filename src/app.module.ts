import { Module, ValidationPipe, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ImageModule } from './image/image.module';
import { CommentModule } from './comment/comment.module';
import { SaveImageModule } from './save-image/save-image.module';
import { APP_PIPE } from '@nestjs/core';
import { PrismaService } from '../prisma/prisma.service.cjs';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => ImageModule),
    forwardRef(() => CommentModule),
    forwardRef(() => SaveImageModule),
  ],
  controllers: [AppController],
  providers: [
    AppService,
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
      }),
    },
  ],
})
export class AppModule {}
