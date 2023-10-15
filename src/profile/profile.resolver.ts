import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserUpdateInput } from './dto/update_user_gql';
import { ProfileService } from './profile.service';
import { User } from '../@custom/user/user.model';
import { UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { CurrentUser } from '../decorators/gql.user-context.decorator';
import { Delete_avatar_gql } from './dto/delete_avatar_gql';

@Resolver()
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService,private readonly jwtService: JwtService) {}
  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async UpdateProfile(@Args() profileDTO: UserUpdateInput, @CurrentUser() user: User) {
    return await this.profileService.UpdateProfile(profileDTO, user.id);
  }
  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async DeleteAvatar(@Args() dto: Delete_avatar_gql, @CurrentUser() user: User) {
    await this.profileService.DeleteAvatar(dto.avatar_filename, user.id);
    return 'Avatar deleted successfully';
  }
}
