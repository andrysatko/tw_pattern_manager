import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';
import { TokenModule } from '../jwt_token/token.module';

@Module({
  imports: [UserModule, UserModule, TokenModule],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
