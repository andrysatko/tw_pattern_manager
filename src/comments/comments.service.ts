import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { assert } from '../utils/assert';

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createComment(_post_id: string, reply: string, _user_id: string) {
    const post = await this.prismaService.post.findUnique({
      where: { id: _post_id },
    });
    assert(
      post,
      BadRequestException,
      'Post that you are trying to comment no more exists',
    );
    const comment = await this.prismaService.comment.create({
      data: { userId: _user_id, postId: _post_id, text: reply },
    });
    return comment;
  }

  async reactComment(
    _comment_id: string,
    reaction: 'LIKE' | 'DISLIKE',
    _user_id: string,
  ) {
    const comment = await this.prismaService.comment.findUnique({
      where: { id: _comment_id },
    });
    assert(
      comment,
      BadRequestException,
      'Comment that you are trying to react no more exists',
    );
    const ReplyReaction = await this.prismaService.replyReaction.findFirst({
      where: { userId: _user_id, replyId: _comment_id },
    });
    if (ReplyReaction) {
      if (ReplyReaction.reaction !== reaction) {
        await this.prismaService.replyReaction.update({
          where: { id: ReplyReaction.id },
          data: { reaction: reaction },
        });
        const inc = ReplyReaction.reaction == 'LIKE' ? { Dislikes: 1 } : { Likes: 1 },
          dec =
            ReplyReaction.reaction !== 'DISLIKE'
              ? { Likes: -1 }
              : { Dislikes: -1 };
        await this.prismaService.$runCommandRaw({
          update: 'Comment',
          updates: [{
              q: { _id: { $oid: _comment_id } },
              u: {
                $inc: { ...inc, ...dec },
              },
            },
          ],
        });
      }
      return reaction;
    }
    const New_Reaction = await this.prismaService.replyReaction.create({
      data: { userId: _user_id, replyId: _comment_id, reaction: reaction },
    });
    await this.prismaService.comment.update({
      where: { id: New_Reaction.replyId },
      data: {
        ...(reaction === 'LIKE'
          ? { Likes: { increment: 1 } }
          : { Dislikes: { increment: 1 } }),
      },
    });
    return reaction;
  }
}
