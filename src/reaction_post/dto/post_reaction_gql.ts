import { ArgsType, Field, registerEnumType } from '@nestjs/graphql';

enum UserRole {
  LIKE = 'LIKE',
  DISLIKE = 'DISLIKE',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});

@ArgsType()
export class PostReaction_GQL {
  @Field(() => String, { nullable: false })
  postId: string;
  @Field(() => UserRole, { nullable: false })
  reaction: UserRole;
}