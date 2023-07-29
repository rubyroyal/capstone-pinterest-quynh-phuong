import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageModule } from './image/image.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { HttpExceptionFilter } from './http-exception/http-exception.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ImageController } from './image/image.controller';
import { ImageService } from './image/image.service';
import { SaveImageModule } from './save-image/save-image.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: 'your_secret_key', // Replace with your actual secret key
      signOptions: { expiresIn: '1h' }, // Adjust the expiration time as needed
    }),
    ImageModule,
    UserModule,
    AuthModule,
    CommentModule,
    SaveImageModule,
    // Add other modules as needed
  ],
  controllers: [AppController, AuthController, ImageController],
  providers: [
    AppService,
    PrismaService,
    ImageService,
    UserService,
    AuthService,
    JwtStrategy,
    // Add other providers as needed
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {
  constructor() {
    // Create and configure the Swagger document
    const config = new DocumentBuilder()
      .setTitle('Your App API')
      .setDescription('API description')
      .setVersion('1.0')
      .addTag('image')
      .addTag('user')
      .addTag('auth')
      .addTag('comment')
      .build();
    // const document = SwaggerModule.createDocument(this.app, config);
    // SwaggerModule.setup('api', this.app, document);
  }
}
