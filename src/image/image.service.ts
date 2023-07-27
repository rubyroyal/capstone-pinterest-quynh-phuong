import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.cjs';
import { Prisma, tblImage, tblComment, tblUser } from '@prisma/client';

@Injectable()
export class ImageService {
  constructor(private prisma: PrismaService) {}

  async getAllImages(): Promise<tblImage[]> {
    return this.prisma.tblImage.findMany();
  }

  async searchImagesByName(name: string): Promise<tblImage[]> {
    return this.prisma.tblImage.findMany({
      where: {
        image_name: {
          contains: name,
        },
      },
    });
  }

  async getImageAndCreator(
    imageId: number,
  ): Promise<{ image: tblImage; creator: tblUser }> {
    const image = await this.prisma.tblImage.findUnique({
      where: {
        image_id: imageId,
      },
      include: {
        tblUser: true,
      },
    });

    if (!image) {
      throw new NotFoundException('Image not found');
    }

    return image;
  }

  async getImageComments(imageId: number): Promise<tblComment[]> {
    return this.prisma.tblComment.findMany({
      where: {
        image_id: imageId,
      },
    });
  }

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

  async saveImageComment(
    imageId: number,
    content: string,
  ): Promise<tblComment> {
    return this.prisma.tblComment.create({
      data: {
        user_id: 1, // Replace this with the actual user ID from the JWT token
        image_id: imageId,
        comment_date: new Date(),
        content: content,
      },
    });
  }
}
