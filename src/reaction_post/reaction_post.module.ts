import { Module } from '@nestjs/common';
import { ReactionPostService } from './reaction_post.service';
import { ReactionPostResolver } from './reaction_post.resolver';

@Module({
  providers: [ReactionPostService, ReactionPostResolver]
})
export class ReactionPostModule {}
