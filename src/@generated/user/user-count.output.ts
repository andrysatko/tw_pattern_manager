import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class UserCount {

    @Field(() => Int, {nullable:false})
    comments?: number;

    @Field(() => Int, {nullable:false})
    Reply?: number;

    @Field(() => Int, {nullable:false})
    Post?: number;

    @Field(() => Int, {nullable:false})
    ReplyReaction?: number;

    @Field(() => Int, {nullable:false})
    PostReaction?: number;
}
