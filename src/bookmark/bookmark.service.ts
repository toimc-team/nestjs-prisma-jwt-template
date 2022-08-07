import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDto } from './dto';
import { EditBookmarkDto } from './dto/edit-bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  getList(userId: number) {
    return this.prisma.bookmark.findMany({
      where: {
        userId,
      },
    });
  }

  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId,
        ...dto,
      },
    });
    return bookmark;
  }

  getById(userId: number, bmId: number) {
    return this.prisma.bookmark.findFirst({
      where: {
        id: bmId,
        userId,
      },
    });
  }

  async editById(userId: number, bmId: number, dto: EditBookmarkDto) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bmId,
      },
    });
    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('您没有权限修改');
    }

    return this.prisma.bookmark.update({
      where: {
        id: bmId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteById(userId: number, bmId: number) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bmId,
      },
    });
    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('您没有权限修改');
    }

    return this.prisma.bookmark.delete({
      where: {
        id: bmId,
      },
    });
  }
}
