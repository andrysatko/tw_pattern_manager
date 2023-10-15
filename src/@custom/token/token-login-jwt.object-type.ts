import { Field, ObjectType } from '@nestjs/graphql';
import { JwtResponse } from './token-jwt.output';

@ObjectType()
export class TokenLoginJwtObjectType {
  @Field(() => JwtResponse, { nullable: false })
  jwt_token!: JwtResponse;
}
