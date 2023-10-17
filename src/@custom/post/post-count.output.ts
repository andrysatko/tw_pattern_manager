import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Post } from './post.model';

@ObjectType()
export class Selected_Posts_with_countModel {
  @Field(() => [Post], { nullable: false })
  posts: Post[];

  @Field(() => Int, { nullable: false })
  Post_count?: number;
}
