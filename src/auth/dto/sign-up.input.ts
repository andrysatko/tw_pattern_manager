import { ArgsType, Field } from '@nestjs/graphql';

import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength , MaxLength } from 'class-validator';

@ArgsType()
export class SignUpInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(40)
  password: string;
}
