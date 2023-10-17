import { ArgsType, Field } from "@nestjs/graphql";
import { InputType } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as Upload from 'graphql-upload/Upload.js';
import { Type } from 'class-transformer';
@ArgsType()
export class PostCreateInput {
  @Field(() => String, { nullable: false })
  @Type(() => String)
  title!: string;

  @Field(() => String, { nullable: false })
  @Type(() => String)
  content!: string;

  @Field(() => [GraphQLUpload], { nullable: false })
  @Type(() => GraphQLUpload)
  Image!: Array<Upload.FileUpload>;
}
