// comment.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { Prisma, tblComment as Comment } from '@prisma/client';
import { CommentService } from './comment.service';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get('image/:id')
  @ApiOkResponse({
    description: 'Retrieve comments by image ID.',
  })
  @ApiNotFoundResponse({ description: 'Image not found.' })
  async getCommentsByImageId(@Param('id') imageId: number): Promise<Comment[]> {
    return this.commentService.getCommentsByImageId(imageId);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Add a new comment.' })
  async createComment(
    @Body() data: Prisma.tblCommentCreateInput,
  ): Promise<Comment> {
    return this.commentService.createComment(data);
  }
}
