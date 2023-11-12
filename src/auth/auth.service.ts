import {
  BadRequestException,
  ForbiddenException,
  Injectable, UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignUpInput } from './dto/sign-up.input';
import { assert } from 'src/utils/assert';
import { hashPassword, PASSWORD_REGEX, compareHash } from './auth.util';
import { TokenService } from '../jwt_token/token.service';
import {MailingService} from "../email/mailing.service";
import {JwtService} from "@nestjs/jwt";
@Injectable()
export class AuthService {
  private PASSWORD_REGEX: any;
  constructor(
    private readonly userService: UserService,
    private readonly tokeService: TokenService,
    private readonly mailingService: MailingService,
    private readonly jwtService: JwtService,
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
    const user = await this.userService.create({
      data: { ...signUpInput, password: passwordHash },
    });
    if(user){
      try{
        await this.mailingService.sendUserConfirmation(user, this.jwtService.sign({id:user.id}));
      } catch (e) {
        console.log(e)
      }
    }
    return user;
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
  async confirmUser(TokenParam : string){
    const token = this.jwtService.decode(TokenParam) as {id : string};
    const user = await this.userService.findUnique({
      where: {
        id: token.id,
      },
    });
    assert(user, BadRequestException, "Incorrect url");
    if(user.EmailConfirmed===false){
      await this.userService.update({
        where: {
          id:token.id
        },
        data:{EmailConfirmed:true}
      });
    }
  }
}
