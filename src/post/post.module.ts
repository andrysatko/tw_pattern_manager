import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { UserModule } from '../user/user.module';

@Module({
  imports:[UserModule],
  providers: [PostService, PostResolver],
})
export class PostModule {}
