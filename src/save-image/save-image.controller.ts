// save-image.controller.ts
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SaveImageService } from './save-image.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { tblImage, tblSaveImage } from '@prisma/client';

@ApiTags('save-image')
@Controller('save-image')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class SaveImageController {
  constructor(private saveImageService: SaveImageService) {}

  @Get('saved/:userId')
  @ApiOkResponse({ description: 'Retrieve saved images by user ID.' })
  async getSavedImagesByUserId(
    @Param('userId') userId: number,
  ): Promise<tblImage[]> {
    return this.saveImageService.getSavedImagesByUserId(userId);
  }

  @Get('created/:userId')
  @ApiOkResponse({ description: 'Retrieve created images by user ID.' })
  async getCreatedImagesByUserId(
    @Param('userId') userId: number,
  ): Promise<tblImage[]> {
    return this.saveImageService.getCreatedImagesByUserId(userId);
  }
}
