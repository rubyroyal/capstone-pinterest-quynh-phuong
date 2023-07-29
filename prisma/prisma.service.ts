import { Injectable } from '@nestjs/common';
import { PrismaClient, tblUser, tblImage } from '.prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  prisma: PrismaClient; // Định nghĩa kiểu cho PrismaClient

  constructor() {
    super();
  }

  async user(): Promise<tblUser | null> {
    return this.tblUser.findFirst(); // Sử dụng findFirst() thay vì findMany()
  }
  // async createImage(imageData: tblImage): Promise<tblImage> {
  //   return this.prisma.tblImage.create({ data: imageData });
  // }
}
