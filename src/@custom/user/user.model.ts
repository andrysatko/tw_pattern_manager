import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Comment } from '../comment/comment.model';
import { Post } from '../post/post.model';

@ObjectType()
export class User {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: true })
  firstName!: string | null;

  @Field(() => String, { nullable: true })
  lastName!: string | null;

  @Field(() => String, { nullable: true })
  phone!: string | null;

  @Field(() => String, { nullable: false })
  password!: string;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  subscribed!: boolean | null;

  @Field(() => [String], { nullable: true })
  Avatar!: Array<string>;

  @Field(() => [Post], { nullable: true })
  Post?: Array<Post>;
}

@ObjectType()
export class PublicUser {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: true })
  firstName!: string | null;

  @Field(() => String, { nullable: true })
  lastName!: string | null;

  @Field(() => [String], { nullable: true })
  Avatar!: Array<string>;
}