import { ArgsType, Field, Int ,registerEnumType} from '@nestjs/graphql';
enum TFilterByEnum {
  MOST_POPULAR = 'MOST_POPULAR',
  RECENT = 'RECENT',
  OLDEST = 'OLDEST',
}

registerEnumType(TFilterByEnum, {
  name: 'TFilterByEnum', // The name of your GraphQL enum type
  description: 'Description for MyEnum', // Optional description
});
@ArgsType()
export class GetPostFilter {
  @Field(() => TFilterByEnum, { nullable: true,defaultValue:TFilterByEnum.RECENT})
  FilterBy?: TFilterByEnum;
  @Field(()=>String , {nullable: true})
  Cursor?:string
}
