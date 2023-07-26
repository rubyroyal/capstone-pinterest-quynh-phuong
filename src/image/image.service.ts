// image.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Prisma, Image, Comment, User } from '@prisma/client';

@Injectable()
export class ImageService {
  constructor(private prisma: PrismaService) {}

  async getAllImages(): Promise<Image[]> {
    return this.prisma.image.findMany();
  }

  async searchImagesByName(name: string): Promise<Image[]> {
    return this.prisma.image.findMany({
      where: {
        image_name: {
          contains: name,
        },
      },
    });
  }

  async getImageAndCreator(imageId: number): Promise<{ image: Image; creator: User }> {
    const image = await this.prisma.image.findUnique({
      where: {
        image_id: imageId,
      },
      include: {
        creator: true,
      },
    });

    if (!image) {
      throw new NotFoundException('Image not found');
    }

    return image;
  }

  async getImageComments(imageId: number): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      where: {
        image_id: imageId,
      },
    });
  }

  async checkImageSaved(imageId: number): Promise<boolean> {
    const savedImage = await this.prisma.saveImage.findUnique({
      where: {
        image_id_user_id: {
          image_id: imageId,
          user_id: 1, // Replace this with the actual user ID from the JWT token
        },
      },
    });

    return !!savedImage;
  }

  async saveImageComment(imageId: number, content: string): Promise<Comment> {
    return this.prisma.comment.create({
      data: {
        user_id: 1, // Replace this with the actual user ID from the JWT token
        image_id: imageId,
        comment_date: new Date(),
        content: content,
      },
    });
  }
}


// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class ImageService {}
