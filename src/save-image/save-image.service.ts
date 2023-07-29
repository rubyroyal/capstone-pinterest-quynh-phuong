// save-image.service.ts
import { Injectable } from '@nestjs/common';
import { Prisma, tblImage, tblSaveImage, tblUser } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SaveImageService {
  constructor(private prisma: PrismaService) {}

  async getSavedImagesByUserId(userId: number): Promise<tblImage[]> {
    const savedImages = await this.prisma.tblSaveImage.findMany({
      where: {
        user_id: userId,
      },
    });

    const imageIds = savedImages.map((savedImage) => savedImage.image_id);
    return this.prisma.tblImage.findMany({
      where: {
        image_id: {
          in: imageIds,
        },
      },
      include: {
        tblUser: true,
      },
    });
  }

  async getCreatedImagesByUserId(userId: number): Promise<tblImage[]> {
    return this.prisma.tblImage.findMany({
      where: {
        user_id: userId,
      },
      include: {
        tblUser: true,
      },
    });
  }
}
