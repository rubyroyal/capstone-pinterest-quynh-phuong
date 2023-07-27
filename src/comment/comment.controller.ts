// comment.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { tblComment } from '.prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':id')
  async getCommentsByImageId(@Param('id') id: number): Promise<tblComment[]> {
    return this.commentService.getCommentsByImageId(id);
  }

  @Post(':id')
  async createComment(
    @Param('id') id: number,
    @Body('content') content: string,
    @Body('userId') userId: number,
  ): Promise<tblComment> {
    return this.commentService.createComment(id, content, userId);
  }
}
