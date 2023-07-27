// comment.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.cjs';
import { tblComment } from '.prisma/client';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async getCommentsByImageId(imageId: number): Promise<tblComment[]> {
    return this.prisma.tblComment.findMany({
      where: {
        image_id: imageId,
      },
    });
  }

  async createComment(
    imageId: number,
    content: string,
    userId: number,
  ): Promise<tblComment> {
    return this.prisma.tblComment.create({
      data: {
        user_id: userId,
        image_id: imageId,
        comment_date: new Date(),
        content: content,
      },
    });
  }
}
