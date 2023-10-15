import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateJwtToken(user: unknown & { id: string; email: string }) {
    const payload = {
      id: user.id,
      email: user.email,
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '3h',
    });
  }
  decodeJwtToken(token: string) {
    return this.jwtService.decode(token.replace('Bearer ', ''));
  }
}