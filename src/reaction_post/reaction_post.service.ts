import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { assert } from '../utils/assert';
@Injectable()
export class ReactionPostService {
  constructor(private readonly prismaService: PrismaService) {}
  async ReactPost(_user_id: string, _post_id: string, reaction: 'like'|'dislike') {
    const post = await this.prismaService.post.findUnique({
      where: { id: _post_id },
    });
    assert(
      post,
      BadRequestException,
      'Post that you are trying to react no more exists',
    );
    const result = await this.prismaService.$runCommandRaw({
      update: 'PostReaction',
      updates: [
        {
          q: { postId: { $oid: _user_id }, userId: { $oid: _user_id } },
          u: { postId: { $oid: _user_id }, userId: { $oid: _user_id } , reaction: reaction },
          upsert: true,
        },
      ],
    });
    return reaction;
  }
}
