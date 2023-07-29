import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, tblUser as User } from '.prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(
    email: string,
    pass_word: string,
    full_name: string,
    age: number,
    avatar: string,
  ): Promise<User> {
    return this.prisma.tblUser.create({
      data: { email, pass_word, full_name, age, avatar },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.tblUser.findFirst({
      where: {
        email,
      },
    });
    return user;
  }

  async findUserById(user_id: number): Promise<User | null> {
    return this.prisma.tblUser.findUnique({
      where: {
        user_id,
      },
    });
  }

  async updateUser(
    user_id: number,
    data: {
      email?: string;
      pass_word?: string;
      full_name?: string;
      age?: number;
      avatar?: string;
    },
  ): Promise<User | null> {
    return this.prisma.tblUser.update({
      where: { user_id },
      data,
    });
  }

  async getUserById(userId: number): Promise<User> {
    return this.prisma.tblUser.findUnique({ where: { user_id: userId } });
  }
  async getUserByEmail(email: string): Promise<User> {
    return this.prisma.tblUser.findUnique({
      where: { email: email } as Prisma.tblUserWhereUniqueInput,
    });
  }

  async loginUser(
    email: string,
    pass_word: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    if (user.pass_word !== pass_word) {
      throw new Error('Invalid credentials');
    }
    const payload = { sub: user.user_id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
