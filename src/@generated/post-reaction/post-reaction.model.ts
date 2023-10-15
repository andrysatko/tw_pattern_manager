import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Reaction } from '../prisma/reaction.enum';
import { User } from '../user/user.model';
import { Post } from '../post/post.model';

@ObjectType()
export class PostReaction {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    postId!: string;

    @Field(() => String, {nullable:false})
    userId!: string;

    @Field(() => Reaction, {nullable:false})
    reaction!: keyof typeof Reaction;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => User, {nullable:false})
    User?: User;

    @Field(() => Post, {nullable:false})
    Post?: Post;
}
