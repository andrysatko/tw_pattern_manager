import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { Reply } from '../reply/reply.model';
import { Post } from '../post/post.model';
import { CommentCount } from './comment-count.output';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class Comment {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    postId!: string;

    @Field(() => String, {nullable:false})
    userId!: string;

    @Field(() => String, {nullable:false})
    text!: string;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => User, {nullable:false})
    User?: User;

    @Field(() => [Reply], {nullable:true})
    Reply?: Array<Reply>;

    @Field(() => Post, {nullable:true})
    Post?: Post | null;

    @HideField()
    _count?: CommentCount;
}
