import { Module, forwardRef } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PrismaService } from '../../prisma/prisma.service.cjs';
import { ImageModule } from 'src/image/image.module';

@Module({
  imports: [forwardRef(() => ImageModule)],
  controllers: [CommentController],
  providers: [CommentService, PrismaService],
})
export class CommentModule {}
