import {ArgsType, Field} from "@nestjs/graphql";
import {Type} from "class-transformer";

@ArgsType()
export class GetMyPostReaction_gql {
@Field(() => String, { nullable: false })
@Type(() => String)
_post_id:string
}