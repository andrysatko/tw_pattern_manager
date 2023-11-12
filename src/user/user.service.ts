import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import {MailingService} from "../email/mailing.service";
@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  // Find
  findFirst = this.prismaService.user.findFirst;
  findFirstOrThrow = this.prismaService.user.findFirstOrThrow;

  findUnique = this.prismaService.user.findUnique;
  findUniqueOrThrow = this.prismaService.user.findUniqueOrThrow;

  findMany = this.prismaService.user.findMany;

  // Create
  create = this.prismaService.user.create;
  createMany = this.prismaService.user.createMany;

  // Update
  update = this.prismaService.user.update;
  upsert = this.prismaService.user.upsert;
  updateMany = this.prismaService.user.updateMany;

  // Delete
  delete = this.prismaService.user.delete;
  deleteMany = this.prismaService.user.deleteMany;

  // Aggregate
  aggregate = this.prismaService.user.aggregate;

  // Count
  count = this.prismaService.user.count;

  // GroupBy
  groupBy = this.prismaService.user.groupBy;
  async getAllUsers( cursorId?: string, include?: Prisma.UserInclude, take = 50, skip = 0) {
    return this.prismaService.user.findMany({
      include,
      take,
      skip,
      cursor: { id: cursorId },
    });
  }
  async getUsers(take = 50, cursorId?: string) {
    const ifCursor = cursorId ? { cursor: { id: cursorId } } : {};
    return this.prismaService.user.findMany({ include: {comments : true, Post : true , Reply : true }, ...ifCursor as any , take: take});
  }
  async findOne(id: string) {
    return this.prismaService.user.findUnique({ where: { id: id },include:{Post : true} });
  }
  async addUser(user: Prisma.UserCreateArgs) {
    return this.prismaService.user.create(user);
  }

  async UpsertUser(
    args: Prisma.UserCreateInput | Prisma.UserUpdateInput,
  ): Promise<User> {
    const user = await this.prismaService.user.upsert({
      where: {
        email: args.email,
        AND: {},
      },
      create: {
        ...(args as Prisma.UserCreateInput),
      },
      update: { ...args },
    } as Prisma.UserUpsertArgs);
    return user;
  }
}
