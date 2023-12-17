import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserUpdateInput } from './dto/update_user_gql';
import { File_Perform } from '../utils/perform_file';
import { assert } from '../utils/assert';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';
@Injectable()
export class ProfileService {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
  ) {}

  async UpdateProfile(updateUserDto: UserUpdateInput, _user_id: string) {
    const user = await this.userService.findUnique({ where: { id: _user_id } });
    assert(user, ForbiddenException, 'Unauthorized exception - login and try again');
    let fileName: string | string[];
    if (updateUserDto.Avatar) {
      fileName = await File_Perform(updateUserDto.Avatar,100,100);
      user.Avatar.length === 4 &&
        fs.unlink(
          path.join(process.cwd(), 'public', user.Avatar[0]),
          function (err) {
            if (err) throw new ForbiddenException('Server side error');
          },
        );
      await this.prismaService.$runCommandRaw({
        update: 'User',
        updates: [
          {
            q: { _id: { $oid: user.id } },
            u: {
              $push: {
                Avatar: {
                  $each: [fileName],
                  $slice: -4,
                },
              },
            },
          },
        ],
      });
    }
    delete updateUserDto.Avatar;
    return this.userService.update({data:{...updateUserDto},where:{id: _user_id}});
  }

  async DeleteAvatar(_avatar_index: string[], _user_id: string) {
    const user = await this.userService.findUnique({ where: { id: _user_id } });
    assert(user, ForbiddenException, 'Unauthorized exception - login and try again');
    const result = await this.prismaService.$runCommandRaw({
      update: 'User',
      updates: [{
          q: { _id: { $oid: _user_id }, Avatar: { $all: _avatar_index } },
          u: {
            $pull: { Avatar: { $in: _avatar_index } },
          },
        },
      ],
    });
    if ((result.nModified as number) >= 1) {
      _avatar_index.forEach((element) => {
        fs.unlink(
          path.join(process.cwd(), 'public', element),
          function (err) {
          if (err)
            throw new ForbiddenException(
              `Unexpected error while deleting avatar ${element}`,
            );
        });
      });
    }
  }
}
