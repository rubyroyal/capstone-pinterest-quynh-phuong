// image.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { tblImage, Prisma } from '@prisma/client';

@Injectable()
export class ImageService {
  constructor(private prisma: PrismaService) {}

  async getAllImages(): Promise<tblImage[]> {
    return this.prisma.tblImage.findMany();
  }

  async searchImagesByName(imageName: string): Promise<tblImage[]> {
    return this.prisma.tblImage.findMany({
      where: { image_name: { contains: imageName } },
    });
  }

  async getImageById(imageId: number): Promise<tblImage | null> {
    return this.prisma.tblImage.findUnique({ where: { image_id: imageId } });
  }

  async checkImageSaved(imageId: number, userId: number): Promise<boolean> {
    const savedImage = await this.prisma.tblSaveImage.findUnique({
      where: { user_id_image_id: { user_id: userId, image_id: imageId } },
    });

    return savedImage !== null;
  }

  async deleteImageById(imageId: number): Promise<void> {
    await this.prisma.tblImage.delete({ where: { image_id: imageId } });
  }

  async createImage(data: Prisma.tblImageCreateInput): Promise<tblImage> {
    return this.prisma.tblImage.create({ data });
  }
}
