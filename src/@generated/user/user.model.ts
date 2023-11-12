import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Comment } from '../comment/comment.model';
import { Reply } from '../reply/reply.model';
import { Post } from '../post/post.model';
import { ReplyReaction } from '../reply-reaction/reply-reaction.model';
import { PostReaction } from '../post-reaction/post-reaction.model';
import { UserCount } from './user-count.output';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class User {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => String, {nullable:true})
    firstName!: string | null;

    @Field(() => String, {nullable:true})
    lastName!: string | null;

    @Field(() => String, {nullable:true})
    phone!: string | null;

    @Field(() => String, {nullable:false})
    password!: string;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    EmailConfirmed!: boolean;

    @Field(() => Boolean, {nullable:true,defaultValue:false})
    subscribed!: boolean | null;

    @Field(() => [String], {nullable:true})
    Avatar!: Array<string>;

    @Field(() => [Comment], {nullable:true})
    comments?: Array<Comment>;

    @Field(() => [Reply], {nullable:true})
    Reply?: Array<Reply>;

    @Field(() => [Post], {nullable:true})
    Post?: Array<Post>;

    @Field(() => [ReplyReaction], {nullable:true})
    ReplyReaction?: Array<ReplyReaction>;

    @Field(() => [PostReaction], {nullable:true})
    PostReaction?: Array<PostReaction>;

    @HideField()
    _count?: UserCount;
}
