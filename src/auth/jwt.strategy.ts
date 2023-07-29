import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service'; // Thay thế UserService bằng service tương ứng của bạn

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your-secret-key', // Thay thế 'your-secret-key' bằng secret key của bạn
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findUserById(payload.sub); // Thay thế findUserById bằng phương thức tương ứng để tìm kiếm user trong cơ sở dữ liệu
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }
}
