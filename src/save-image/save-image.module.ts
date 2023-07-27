import { Module, forwardRef } from '@nestjs/common';
import { SaveImageService } from './save-image.service';
import { SaveImageController } from './save-image.controller';
import { PrismaService } from '../../prisma/prisma.service.cjs';
import { ImageModule } from 'src/image/image.module';

@Module({
  imports: [forwardRef(() => ImageModule)],
  controllers: [SaveImageController],
  providers: [SaveImageService, PrismaService],
})
export class SaveImageModule {}
