import { Args, Resolver } from '@nestjs/graphql';
import { Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from '../@custom/user/user.model';
import { GetUsersFilter } from './dto/get_users_args_gql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { CurrentUser } from '../decorators/gql.user-context.decorator';
// import { UserUpdateInput } from './dto/update_user_gql';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  // @Mutation(() => User)
  // async UpdateUser(@Args() userUpdateInput: UserUpdateInput) {
  //   return await this.userService.update({data:userUpdateInput});
  // }
  @Query(() => [User])
  async users(@Args() args: GetUsersFilter): Promise<User[]> {
    const users = await this.userService.getUsers(args.take, args.id);
    return users as any;
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async User_info(@CurrentUser() user: User): Promise<User> {
    const User = await this.userService.findOne(user.id);
    return User as User;
  }
}
