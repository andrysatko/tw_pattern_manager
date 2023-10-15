import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JwtResponse {
  @Field(() => String, { nullable: false })
  jwt_token: string;
}
