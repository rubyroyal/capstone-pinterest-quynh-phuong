import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;

  // Thêm các thuộc tính cá nhân khác tùy theo yêu cầu của bạn
}
