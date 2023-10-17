import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Comment } from '../comment/comment.model';
import { User } from '../user/user.model';
import { PostReaction } from '../post-reaction/post-reaction.model';
import { PostCount } from './post-count.output';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class Post {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    title!: string;

    @Field(() => String, {nullable:false})
    content!: string;

    @Field(() => [String], {nullable:true})
    Image!: Array<string>;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => String, {nullable:false})
    authorId!: string;

    @Field(() => [Comment], {nullable:true})
    comments?: Array<Comment>;

    @Field(() => User, {nullable:false})
    author?: User;

    @Field(() => [PostReaction], {nullable:true})
    reactions?: Array<PostReaction>;

    @HideField()
    _count?: PostCount;
}
