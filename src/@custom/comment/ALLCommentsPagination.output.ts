import {Field, Int} from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Reply } from '../reply/reply.model';
import {Comment} from "./comment.model";

@ObjectType()
export class ALLCommentsPaginationOutput {
    @Field(() => [Comment], { nullable: false })
    comments: Array<Comment>;

    @Field(() => Int, { nullable: false })
    TotalCommentsCount:number;
}
