import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: '1234', // Thay thế 'your-secret-key' bằng secret key của bạn
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [JwtStrategy, UserService, PrismaService],
  exports: [JwtModule, JwtStrategy],
})
export class AuthModule {}
