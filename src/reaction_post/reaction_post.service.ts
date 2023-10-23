import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { assert } from '../utils/assert';
@Injectable()
export class ReactionPostService {
  constructor(private readonly prismaService: PrismaService) {}
  async ReactPost(_user_id: string, _post_id: string, reaction: 'LIKE'|'DISLIKE') {
    const post = await this.prismaService.post.findUnique({
      where: { id: _post_id },
    });
    assert(
      post,
      BadRequestException,
      'Post that you are trying to react no more exists',
    );
    const Reaction = await this.prismaService.postReaction.findFirst({
      where: { userId: _user_id, postId: _post_id },
    });
    if (Reaction) {
      if (Reaction.reaction !== reaction) {
        await this.prismaService.postReaction.update({
          where: { id: Reaction.id },
          data: { reaction: reaction },
        });
        const inc = Reaction.reaction == 'LIKE' ? { Dislikes: 1 } : { Likes: 1 },
              dec = Reaction.reaction !== 'DISLIKE' ? { Likes: -1 } : { Dislikes: -1 };
        await this.prismaService.$runCommandRaw({
          update: 'Post',
          updates: [{
              q: { _id: { $oid: _post_id } },
              u: {
                $inc: { ...inc, ...dec },
              },
            },
          ],
        });
      }
      return reaction;
    }
    const New_Reaction = await this.prismaService.postReaction.create({
      data: { userId: _user_id, postId: _post_id, reaction: reaction },
    });
    await this.prismaService.post.update({
      where: { id: New_Reaction.postId },
      data: {
        ...(reaction === 'LIKE'
          ? { Likes: { increment: 1 } }
          : { Dislikes: { increment: 1 } }),
      },
    });
    return reaction;
  }

  async DeleteReaction(_user_id: string, _post_id: string) {
    const result = await this.prismaService.postReaction.deleteMany({
      where: { userId: _user_id, postId: _post_id },
    });
    return 'success';
  }
}
