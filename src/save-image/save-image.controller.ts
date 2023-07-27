// saveImage.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SaveImageService } from './save-image.service';
import { tblComment } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('SaveImage')
@Controller('saveImage')
export class SaveImageController {
  constructor(private readonly saveImageService: SaveImageService) {}

  @Get(':id')
  async checkImageSaved(@Param('id') id: number): Promise<boolean> {
    return this.saveImageService.checkImageSaved(id);
  }

  @Post(':id')
  async saveImage(
    @Param('id') id: number,
    @Body('userId') userId: number,
  ): Promise<void> {
    return this.saveImageService.saveImage(id, userId);
  }

  @Get(':id/comments')
  async getImageComments(@Param('id') id: number): Promise<tblComment[]> {
    return this.saveImageService.getImageComments(id);
  }

  @Post(':id/comments')
  async saveImageComment(
    @Param('id') id: number,
    @Body('content') content: string,
    @Body('userId') userId: number,
  ): Promise<tblComment> {
    return this.saveImageService.saveImageComment(id, content, userId);
  }
}
