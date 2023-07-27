import { Module, forwardRef } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { PrismaService } from '../../prisma/prisma.service.cjs';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [ImageController],
  providers: [ImageService, PrismaService],
})
export class ImageModule {}
