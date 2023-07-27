// user.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.cjs';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(
    email: string,
    password: string,
    fullName: string,
    age: number,
    avatar: string,
  ): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        email,
        pass_word: password,
        full_name: fullName,
        age,
        avatar,
      },
    });
    return user;
  }
  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { user_id: id } });
  }
}
