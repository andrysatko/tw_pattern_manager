import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PostService } from './post.service';
import { Post } from '../@custom/post/post.model';
import { PostCreateInput } from "./dto/create_post_gql";

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => Post)
  LatestPosts(){
    return this.postService.getLatestPosts();
}

  @Mutation(() => Post)
  createPost(@Args('createPostArgs', { type: () => PostCreateInput }) createPostArgs: PostCreateInput){
    return this.postService.createPost(createPostArgs);
  }
}
