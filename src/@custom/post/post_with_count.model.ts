import { Field, Int } from '@nestjs/graphql';

export class Post_with_countModel {
  @Field(() => Int, { nullable: false })
  comments?: number;
}
