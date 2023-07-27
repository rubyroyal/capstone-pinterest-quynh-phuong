import { Module, forwardRef } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [UserService],
  exports: [UserService],
})
export class AuthModule {}
