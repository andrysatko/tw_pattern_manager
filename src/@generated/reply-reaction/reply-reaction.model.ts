import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Reaction } from '../prisma/reaction.enum';
import { User } from '../user/user.model';
import { Reply } from '../reply/reply.model';

@ObjectType()
export class ReplyReaction {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    replyId!: string;

    @Field(() => String, {nullable:false})
    userId!: string;

    @Field(() => Reaction, {nullable:false})
    reaction!: keyof typeof Reaction;

    @Field(() => User, {nullable:false})
    User?: User;

    @Field(() => Reply, {nullable:false})
    Reply?: Reply;
}
