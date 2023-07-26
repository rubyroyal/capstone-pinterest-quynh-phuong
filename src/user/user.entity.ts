import { Prisma } from '@prisma/client';

export interface User extends Prisma.UserCreateInput {
  user_id: number;
  email: string;
  pass_word: string;
  full_name: string;
  age: number;
  avatar: string;
}
