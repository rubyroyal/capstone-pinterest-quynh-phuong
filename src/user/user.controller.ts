import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { tblUser } from '.prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(
    @Body()
    userData: {
      email: string;
      pass_word: string;
      full_name: string;
      age: number;
      avatar: string;
    },
  ): Promise<tblUser> {
    const { email, pass_word, full_name, age, avatar } = userData;
    return this.userService.registerUser(
      email,
      pass_word,
      full_name,
      age,
      avatar,
    );
  }

  @Post('login')
  async loginUser(
    @Body() loginData: { email: string; pass_word: string },
  ): Promise<{ accessToken: string }> {
    const { email, pass_word } = loginData;
    return this.userService.loginUser(email, pass_word);
  }

  // @Post('login')
  // async loginUser(
  //   @Body() loginData: { email: string; pass_word: string },
  // ): Promise<{ accessToken: string }> {
  //   const { email, pass_word } = loginData;
  //   return this.userService.loginUser(email, pass_word);
  // }

  @Get(':id')
  async getUser(@Param('id') userId: number): Promise<tblUser | null> {
    return this.userService.findUserById(userId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Param('id') userId: number,
    @Body()
    updateData: {
      email?: string;
      pass_word?: string;
      full_name?: string;
      age?: number;
      avatar?: string;
    },
  ): Promise<tblUser | null> {
    return this.userService.updateUser(userId, updateData);
  }
}
