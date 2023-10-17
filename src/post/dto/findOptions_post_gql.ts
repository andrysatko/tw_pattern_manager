import { ArgsType, Field, Int } from '@nestjs/graphql';

enum OrderPhotoByDate {
  ASC = 'asc',
  DESC = 'desc',
}
@ArgsType()
export class GetPostOptions {
  @Field(() => String, { nullable: false })
  userId: string;

  @Field(() => Int, { nullable: true })
  take: number;

  @Field(() => String, { nullable: true })
  cursor: string;

  @Field(() => Int, { nullable: true })
  skip: number;

  @Field(() => String, { nullable: true })
  orderBy: OrderPhotoByDate;
}
