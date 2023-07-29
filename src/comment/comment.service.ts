import { Injectable } from '@nestjs/common';
import { Prisma, tblComment } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async getCommentsByImageId(imageId: number): Promise<tblComment[]> {
    return this.prisma.tblComment.findMany({
      where: { image_id: imageId },
      include: { tblUser: true }, // Sửa include thành { tblUser: true }
    });
  }

  async createComment(
    commentData: Prisma.tblCommentCreateInput,
  ): Promise<tblComment> {
    return this.prisma.tblComment.create({ data: commentData });
  }
}
