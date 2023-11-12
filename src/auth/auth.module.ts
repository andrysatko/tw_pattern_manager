import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';
import { TokenModule } from '../jwt_token/token.module';
import {MailingModule} from "../email/mailing.module";
import {JwtModule} from "@nestjs/jwt";
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule, UserModule, TokenModule, MailingModule, JwtModule.register({
    global:false,
    secret: process.env.JWT_CONFIRMATION_SECRET,
    signOptions: { expiresIn: '1h' },
  })],
  providers: [AuthService, AuthResolver],
  controllers: [AuthController],
})
export class AuthModule {}
