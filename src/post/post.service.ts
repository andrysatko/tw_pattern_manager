import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostCreateInput } from './dto/create_post_gql';
import { UserUpdateInput } from '../profile/dto/update_user_gql';
import { assert } from '../utils/assert';
import { Perform_file } from '../utils/perform_file';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  getLatestPosts() {
    return this.prismaService.post.findMany({
      include: { comments: true, reactions: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  createPost(createProductsArgs: PostCreateInput) {
    const { author, ...data } = createProductsArgs;
    return this.prismaService.post.create({
      data: { ...data, authorId: author },
    });
  }

  // async UpdateProfile(updateUserDto: UserUpdateInput, id: string) {
  //   const user = await this.prismaService.post.findUnique({ where: { id: id } });
  //   assert(user, ForbiddenException, 'User not exist');
  //   let fileName: string[] = [];
  //   fileName = updateUserDto.Avatar && (Array.isArray(updateUserDto.Avatar)
  //     ? []
  //     : [await Perform_file(updateUserDto.Avatar)]);
  //   return this.userService.update({data:{...updateUserDto,Avatar:fileName},where:{id:id}});
  // }
}
