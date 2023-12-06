import { Field, Int } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Comment } from '../comment/comment.model';
import {PublicUser} from "../user/user.model";
@ObjectType()
export class AdditionalCount{
  @Field(() => Int, { nullable: false })
  comments: number
}

@ObjectType()
export class Post {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: false })
  content!: string;

  @Field(() => [String], { nullable: true })
  Image!: Array<string>;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => PublicUser, { nullable: false })
  author: PublicUser;

  @Field(() => AdditionalCount, { nullable: true })
  _count: AdditionalCount;

  @Field(() => Int, { nullable: false })
  Likes: number;

  @Field(() => Int, { nullable: false })
  Dislikes: number;
}

@ObjectType()
export class MyReactionToPost{
  @Field(() => String, { nullable: true })
  reaction:String
}