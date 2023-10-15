import { registerEnumType } from '@nestjs/graphql';

export enum Reaction {
    LIKE = "LIKE",
    DISLIKE = "DISLIKE"
}


registerEnumType(Reaction, { name: 'Reaction', description: undefined })
