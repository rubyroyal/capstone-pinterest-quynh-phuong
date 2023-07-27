import { ApiProperty } from '@nestjs/swagger';
import { tblUser as PrismaUser } from '@prisma/client';

export class User implements PrismaUser {
  @ApiProperty({ example: 1, description: 'The user ID' })
  user_id: number;

  @ApiProperty({
    example: 'alice@gmail.com',
    description: 'The email address of the user',
  })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The hashed password of the user',
  })
  pass_word: string;

  @ApiProperty({ example: 'Alice', description: 'The full name of the user' })
  full_name: string;

  @ApiProperty({ example: 30, description: 'The age of the user' })
  age: number;

  @ApiProperty({
    example: 'avatar1.png',
    description: 'The avatar URL of the user',
  })
  avatar: string;

  // Relationships
  tblComment: any[];
  tblImage: any[];
  tblSaveImage: any[];
}
