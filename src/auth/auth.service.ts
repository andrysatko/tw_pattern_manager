import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignUpInput } from './dto/sign-up.input';
import { assert } from 'src/utils/assert';
import { hashPassword, PASSWORD_REGEX, compareHash } from './auth.util';
import { TokenService } from '../jwt_token/token.service';
@Injectable()
export class AuthService {
  private PASSWORD_REGEX: any;
  constructor(
    private readonly userService: UserService,
    private readonly tokeService: TokenService,
  ) {
    this.PASSWORD_REGEX = PASSWORD_REGEX;
  }

  async signUp(signUpInput: SignUpInput) {
    const existingUser = await this.userService.findUnique({
      where: {
        email: signUpInput.email,
      },
    });
    assert(!existingUser, ForbiddenException, 'This user already exists');
    const isPasswordValid = this.PASSWORD_REGEX.test(signUpInput.password);
    assert(!isPasswordValid, BadRequestException, 'Password too weak');
    const passwordHash = await hashPassword(signUpInput.password);
    return this.userService.create({
      data: { ...signUpInput, password: passwordHash },
    });
  }
  async login(loginInput: SignUpInput) {
    const user = await this.userService.findUnique({
      where: {
        email: loginInput.email,
      },
    });
    assert(user, ForbiddenException, "This user doesn't exist");
    const isValid = await compareHash(loginInput.password, user.password);
    assert(isValid, ForbiddenException, 'Wrong password');
    return { jwt_token: this.tokeService.generateJwtToken(user) };
  }
}
