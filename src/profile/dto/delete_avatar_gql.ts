import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class Delete_avatar_gql {
  @Field(() => [String], { nullable: false })
  avatar_filename: string[];
}
