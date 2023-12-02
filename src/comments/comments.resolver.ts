import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {Selected_Posts_with_countModel} from "../@custom/post/post-count.output";
import {GetCommentsOptions} from "./dto/GetCommentsDto";
import {CommentsService} from "./comments.service";
import {Comment} from "../@custom/comment/comment.model";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../guards/gql-auth.guard";
import {CreateCommentDto} from "./dto/CreateCommentDto";
import {CurrentUser} from "../decorators/gql.user-context.decorator";
import {User} from "../@custom/user/user.model";
import {ALLCommentsPaginationOutput} from "../@custom/comment/ALLCommentsPagination.output";


@Resolver()
export class CommentsResolver {
    constructor(private readonly commentService: CommentsService ) {}
    @Query(() => ALLCommentsPaginationOutput)
    GetComments_ForPost(@Args() dto: GetCommentsOptions) {
        return this.commentService.getCommentsForPost(dto);
    }
@UseGuards(GqlAuthGuard)
@Mutation(() => Comment)
    createComment(@Args() dto:CreateCommentDto,  @CurrentUser() user: User){
        return this.commentService.createComment(dto._post_id, dto.reply, user.id);
    }

}
