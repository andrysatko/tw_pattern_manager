import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpInput } from './dto/sign-up.input';
import { Prisma } from '@prisma/client';
import { User } from '../@custom/user/user.model';
import { JwtResponse } from '../@custom/token/token-jwt.output';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}
  @Mutation(() => User)
  async signUp(@Args() signUpInput: SignUpInput): Promise<Prisma.UserGetPayload<any>> {
    return await this.authService.signUp(signUpInput);
  }
  @Mutation(() => JwtResponse)
  async login(@Args() signUpInput: SignUpInput):  Promise<{jwt_token: string}> {
    return await this.authService.login(signUpInput);
  }
}
