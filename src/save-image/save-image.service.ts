// saveImage.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.cjs';
import { tblComment, tblSaveImage } from '@prisma/client';

@Injectable()
export class SaveImageService {
  constructor(private prisma: PrismaService) {}

  async checkImageSaved(imageId: number): Promise<boolean> {
    const savedImage = await this.prisma.tblSaveImage.findUnique({
      where: {
        image_id_user_id: {
          image_id: imageId,
          user_id: 1, // Replace this with the actual user ID from the JWT token
        },
      },
    });

    return !!savedImage;
  }

  async saveImage(imageId: number, userId: number): Promise<void> {
    await this.prisma.tblSaveImage.create({
      data: {
        user_id: userId,
        image_id: imageId,
        save_date: new Date(),
      },
    });
  }

  async getImageComments(imageId: number): Promise<tblComment[]> {
    return this.prisma.tblComment.findMany({
      where: {
        image_id: imageId,
      },
    });
  }

  async saveImageComment(
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
