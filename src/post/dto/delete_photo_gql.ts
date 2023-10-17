import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class Delete_Selected_Photos_Gql {
  @Field(() => [String], { nullable: false })
  Images: string[];
}
