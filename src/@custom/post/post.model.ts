import { Field, Int } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Comment } from '../comment/comment.model';
@ObjectType()
export class Post {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: true })
  image!: string | null;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: false })
  content!: string;

  @Field(() => [String], { nullable: true })
  Image!: Array<string>;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => String, { nullable: false })
  authorId!: string;

  @Field(() => [Comment], { nullable: true })
  comments?: Array<Comment>;

  @Field(() => Int, { nullable: false })
  likesCount: number;

  @Field(() => Int, { nullable: false })
  dislikesCount: number;
}
