import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ReactionPostService } from './reaction_post.service';
import { UseGuards } from '@nestjs/common';
import { User } from '../@custom/user/user.model';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { CurrentUser } from '../decorators/gql.user-context.decorator';
import { PostReaction_GQL } from './dto/post_reaction_gql';

@Resolver()
export class ReactionPostResolver {
  constructor(private readonly reactionPostService: ReactionPostService) {}
  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  ReactToThePost(
    @Args() PostReaction: PostReaction_GQL,
    @CurrentUser() user: User,
  ) {
    return this.reactionPostService.ReactPost(
      user.id,
      PostReaction.postId,
      PostReaction.reaction,
    );
  }
  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  DeleteReaction(@Args('post_id') post_id: string, @CurrentUser() user: User) {
    return this.reactionPostService.DeleteReaction(user.id, post_id);
}
}
