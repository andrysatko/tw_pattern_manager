import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from '../@custom/post/post.model';
import { PostCreateInput } from './dto/create_post_gql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { CurrentUser } from '../decorators/gql.user-context.decorator';
import { User } from '../@custom/user/user.model';
import { Delete_Selected_Photos_Gql } from "./dto/delete_photo_gql";

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  createPost(@Args() createPostArgs: PostCreateInput, @CurrentUser() user: User){
    return this.postService.createPost(createPostArgs, user.id);
  }
  @Query(() => Post)
  LatestPosts() {
    return this.postService.getLatestPosts();
  }

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  DeleteSelectedPhotos(@Args() dto: Delete_Selected_Photos_Gql, @CurrentUser() user: User){
    return this.postService.DeleteSelectedPhotos(dto.Images, user.id);
  }
}
