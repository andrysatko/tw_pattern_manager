import { ArgsType, Int, Field } from '@nestjs/graphql';
@ArgsType()
export class GetUsersFilter {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => Int, { nullable: true })
  take?: number;
}
