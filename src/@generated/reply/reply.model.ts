import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { ReplyReaction } from '../reply-reaction/reply-reaction.model';
import { User } from '../user/user.model';
import { Comment } from '../comment/comment.model';
import { ReplyCount } from './reply-count.output';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class Reply {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    text!: string;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => String, {nullable:false})
    userId!: string;

    @Field(() => String, {nullable:false})
    commentId!: string;

    @Field(() => [ReplyReaction], {nullable:true})
    ReplyReaction?: Array<ReplyReaction>;

    @Field(() => User, {nullable:false})
    User?: User;

    @Field(() => Comment, {nullable:false})
    Comment?: Comment;

    @HideField()
    _count?: ReplyCount;
}
