// user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../../prisma/prisma.service'; // Kiểm tra đường dẫn

@Module({
  providers: [UserService, PrismaService], // Đảm bảo PrismaService đã được thêm vào providers
  controllers: [UserController],
})
export class UserModule {}
