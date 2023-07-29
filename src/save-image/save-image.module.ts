// save-image/save-image.module.ts
import { Module } from '@nestjs/common';
import { SaveImageController } from './save-image.controller';
import { SaveImageService } from './save-image.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [SaveImageController],
  providers: [SaveImageService, PrismaService], // Thêm SaveImageService và PrismaService vào providers
})
export class SaveImageModule {}
