// image.controller.ts
import { Controller, Get, Param, Query, Post, Body } from '@nestjs/common';
import { ImageService } from './image.service';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  getAllImages() {
    return this.imageService.getAllImages();
  }

  @Get('search')
  searchImages(@Query('name') name: string) {
    return this.imageService.searchImagesByName(name);
  }

  @Get(':imageId')
  getImageAndCreator(@Param('imageId') imageId: number) {
    return this.imageService.getImageAndCreator(imageId);
  }

  @Get(':imageId/comments')
  getImageComments(@Param('imageId') imageId: number) {
    return this.imageService.getImageComments(imageId);
  }

  @Get(':imageId/saved')
  checkImageSaved(@Param('imageId') imageId: number) {
    return this.imageService.checkImageSaved(imageId);
  }

  @Post(':imageId/comments')
  saveImageComment(
    @Param('imageId') imageId: number,
    @Body() body: { content: string },
  ) {
    return this.imageService.saveImageComment(imageId, body.content);
  }
}

// import { Controller } from '@nestjs/common';

// @Controller('image')
// export class ImageController {}
