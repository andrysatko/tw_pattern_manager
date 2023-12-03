import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostCreateInput } from './dto/create_post_gql';
import { assert } from '../utils/assert';
import { Perform_file } from '../utils/perform_file';
import { UserService } from '../user/user.service';
import fs from 'fs';
import path from 'path';
import process from 'process';
import { GetPostOptions } from './dto/findOptions_post_gql';
import { GetPostFilter } from './dto/getPost_postFilter_gql';
import type { Prisma } from '@prisma/client';
type OrderByType = Prisma.PostOrderByWithRelationInput;
@Injectable()
export class PostService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  // Find
  findFirst = this.prismaService.post.findFirst;
  findFirstOrThrow = this.prismaService.post.findFirstOrThrow;

  findUnique = this.prismaService.post.findUnique;
  findUniqueOrThrow = this.prismaService.post.findUniqueOrThrow;

  findMany = this.prismaService.post.findMany;

  // Create
  create = this.prismaService.post.create;
  createMany = this.prismaService.post.createMany;

  // Update
  update = this.prismaService.post.update;
  upsert = this.prismaService.post.upsert;
  updateMany = this.prismaService.post.updateMany;

  // Delete
  delete = this.prismaService.post.delete;
  deleteMany = this.prismaService.post.deleteMany;

  // Aggregate
  aggregate = this.prismaService.post.aggregate;

  // Count
  count = this.prismaService.post.count;

  // GroupBy
  groupBy = this.prismaService.post.groupBy;
  getLatestPosts() {
    return this.prismaService.post.findMany({
      include: { comments: true, reactions: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createPost(createProductsArgs: PostCreateInput, _user_id: string) {
    const user = await this.userService.findUnique({ where: { id: _user_id } });
    assert(
      user,
      ForbiddenException,
      'Unauthorized exception - login and try again',
    );
    if (createProductsArgs.Image.length > 10)
      throw new BadRequestException('You can upload only 10 images');
    const FNameArray: string[] = await Promise.all(
      createProductsArgs.Image.map((FUpload) => {
        return Perform_file(FUpload, 1920, 1080);
      }),
    );
    delete createProductsArgs.Image;
    return this.prismaService.post.create({
      data: { ...createProductsArgs, Image: FNameArray, authorId: user.id },
    });
  }
  async GetPostFo__User(findOptions?: GetPostOptions){
    const UserSPost = await this.prismaService.post.findMany({
      where: { authorId: findOptions.userId },
      orderBy: { createdAt: findOptions.orderBy ?? 'asc' },
      take: findOptions.take ?? 10,
      skip: findOptions.skip ?? 0,
      cursor: findOptions.cursor ? { id: findOptions.cursor } : undefined,
      include: { comments: {take:10}, reactions: true,author:{select:{id:true,Avatar:true,firstName:true,lastName:true}}},
    });
    const totalCount = await this.count({where:{authorId:findOptions.userId}})
    return { Post_count: totalCount, posts: UserSPost };
  }
  async GetMyReactionForPost(_post_id:string,_user_id:string){
    return this.prismaService.postReaction.findFirst({where: {postId: _post_id, userId: _user_id}});
  }
  async GetPosts_WithFilter(GetPostFilter: GetPostFilter) {
    const totalCount = await this.count()
    const Filter_Result = async (filter: OrderByType) => {
      const FilterRedPost = await this.prismaService.post.findMany({
        orderBy: filter,
        take:10,
        include: { comments: {take:10}, reactions: true,author:{select:{id:true,Avatar:true,firstName:true,lastName:true}}},
        cursor: {id: GetPostFilter.Cursor},
        skip: GetPostFilter.Cursor ? 1 : 0
      });
      return { Post_count: totalCount, posts: FilterRedPost };
    }
    switch (GetPostFilter.FilterBy) {
      case 'RECENT':
        return Filter_Result({ createdAt: 'desc' });
      case 'OLDEST':
        return Filter_Result({ createdAt: 'asc' });
      case 'MOST_POPULAR':
        return Filter_Result({ Likes: 'desc' });
      default:
        throw new BadRequestException('Invalid filter');
    }
  }
  async DeleteSelectedPhotos(_Images: string[], _user_id: string) {
    const user = await this.userService.findUnique({ where: { id: _user_id } });
    assert(
      user,
      ForbiddenException,
      'Unauthorized exception - login and try again',
    );
    const result = await this.prismaService.$runCommandRaw({
      update: 'Post',
      updates: [
        {
          q: { authorId: { $oid: _user_id }, Image: { $all: _Images } },
          u: {
            $pull: { Image: { $in: _Images } },
          },
        },
      ],
    });
    if ((result.nModified as number) >= 1) {
      _Images.forEach((element) => {
        fs.unlink(path.join(process.cwd(), 'public', element), function (err) {
          if (err)
            throw new ForbiddenException(
              `Unexpected error while deleting avatar ${element}`,
            );
        });
      });
    }
  }

  async DeletePost(_post_id: string, _user_id: string) {
    await this.prismaService.post.delete({
      where: { id: _post_id, authorId: _user_id },
    });
  }
}
