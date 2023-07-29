import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { Prisma, tblImage, PrismaClient } from '@prisma/client'; // Import Prisma

import { ImageService } from './image.service';

@ApiTags('image')
@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Get()
  @ApiOkResponse({ description: 'Retrieve all images.' })
  async getAllImages(): Promise<tblImage[]> {
    return this.imageService.getAllImages();
  }

  @Get('search')
  @ApiOkResponse({ description: 'Search images by name.' })
  async searchImagesByName(
    @Query('name') imageName: string,
  ): Promise<tblImage[]> {
    return this.imageService.searchImagesByName(imageName);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Retrieve an image by ID.' })
  @ApiNotFoundResponse({ description: 'Image not found.' })
  async getImageById(@Param('id') imageId: number): Promise<tblImage | null> {
    return this.imageService.getImageById(imageId);
  }

  @Get(':id/saved')
  @ApiOkResponse({ description: 'Check if an image is saved.', type: Boolean })
  async checkImageSaved(@Param('id') imageId: number): Promise<boolean> {
    // Để kiểm tra ảnh đã lưu hay chưa, bạn có thể sử dụng JWT token để xác định user_id và truyền vào hàm checkImageSaved(imageId, userId)
    const userId = 1; // Giả sử user_id là 1
    return this.imageService.checkImageSaved(imageId, userId);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Delete an image by ID.' })
  @ApiNotFoundResponse({ description: 'Image not found.' })
  async deleteImageById(@Param('id') imageId: number): Promise<void> {
    return this.imageService.deleteImageById(imageId);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Add a new image.' })
  async createImage(@Body() data: tblImage): Promise<tblImage> {
    return this.imageService.createImage(data);
  }
}
