// image.controller.ts
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ImageService } from './image.service';
import { tblComment } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  async getAllImages() {
    return this.imageService.getAllImages();
  }

  @Get('search')
  async searchImagesByName(@Query('name') name: string) {
    return this.imageService.searchImagesByName(name);
  }

  @Get(':id')
  async getImageAndCreator(@Param('id') id: number) {
    return this.imageService.getImageAndCreator(id);
  }

  @Get(':id/comments')
  async getImageComments(@Param('id') id: number): Promise<tblComment[]> {
    return this.imageService.getImageComments(id);
  }

  @Get(':id/saved')
  async checkImageSaved(@Param('id') id: number): Promise<boolean> {
    return this.imageService.checkImageSaved(id);
  }

  @Post(':id/comments')
  async saveImageComment(
    @Param('id') id: number,
    @Body('content') content: string,
  ): Promise<tblComment> {
    return this.imageService.saveImageComment(id, content);
  }
}
