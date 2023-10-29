import { ArgsType, Field, registerEnumType } from '@nestjs/graphql';

enum ReactionEnum {
  LIKE = 'LIKE',
  DISLIKE = 'DISLIKE',
}

registerEnumType(ReactionEnum, {
  name: 'UserRole',
});

@ArgsType()
export class PostReaction_GQL {
  @Field(() => String, { nullable: false })
  postId: string;
  @Field(() => ReactionEnum, { nullable: false })
  reaction: ReactionEnum;
}
