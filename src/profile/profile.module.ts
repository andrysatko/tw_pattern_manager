import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../strategy';
@Module({
  imports: [UserModule, PassportModule, JwtModule],
  providers: [ProfileService, ProfileResolver, JwtStrategy],
})
export class ProfileModule {}
