import { ArgsType, Field, Int } from '@nestjs/graphql';
@ArgsType()
export class CreateCommentDto {
    @Field(() => String, { nullable: false })
    _post_id: string;

    @Field(() => String, { nullable: false })
    reply: string;
}
