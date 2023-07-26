// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<User> {
    const { email, password, fullName, age } = signupDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userService.createUser({
      email,
      password: hashedPassword,
      fullName,
      age,
    });
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;

    const user = await this.userService.getUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = this.generateAccessToken(user.id);
    return { accessToken };
  }

  generateAccessToken(userId: number): string {
    const payload = { userId };
    return this.jwtService.sign(payload);
  }
}
