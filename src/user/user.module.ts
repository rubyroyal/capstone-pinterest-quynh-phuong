import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [AuthService],
  exports: [AuthService],
})
export class UserModule {}
