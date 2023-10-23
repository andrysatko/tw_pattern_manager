import { ArgsType, Field } from '@nestjs/graphql';

enum OrderPhotoByDate {
  MOST_POPULAR = 'most_popular',
  RECENT = 'recent',
  OLDEST = 'oldest',
}
@ArgsType()
export class GetPostFilter {
  @Field(() => String, { nullable: false })
  FilterBy: OrderPhotoByDate;
}
