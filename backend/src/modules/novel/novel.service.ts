import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CreateNovelDto, UpdateNovelDto, UpdateNovelStatusDto } from './dto/novel.dto';

@Injectable()
export class NovelService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateNovelDto) {
    const novel = await this.prisma.novel.create({
      data: {
        userId,
        title: dto.title,
        category: dto.category,
        penName: dto.penName,
      },
    });

    return novel;
  }

  async findAll(userId: string, page = 1, pageSize = 20, status?: string) {
    const where: any = { userId };
    if (status) {
      where.status = status;
    }

    const [novels, total] = await Promise.all([
      this.prisma.novel.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.novel.count({ where }),
    ]);

    return { novels, total, page, pageSize };
  }

  async findOne(userId: string, novelId: string) {
    const novel = await this.prisma.novel.findUnique({
      where: { id: novelId },
      include: {
        settings: {
          orderBy: { updatedAt: 'desc' },
        },
        chapters: {
          orderBy: { chapterNumber: 'asc' },
          take: 10,
        },
        outlines: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!novel) {
      throw new NotFoundException('小说不存在');
    }

    if (novel.userId !== userId) {
      throw new ForbiddenException('无权访问此小说');
    }

    return novel;
  }

  async update(userId: string, novelId: string, dto: UpdateNovelDto) {
    await this.checkOwnership(userId, novelId);

    const novel = await this.prisma.novel.update({
      where: { id: novelId },
      data: dto,
    });

    return novel;
  }

  async updateStatus(userId: string, novelId: string, dto: UpdateNovelStatusDto) {
    await this.checkOwnership(userId, novelId);

    const novel = await this.prisma.novel.update({
      where: { id: novelId },
      data: { status: dto.status },
    });

    return novel;
  }

  async delete(userId: string, novelId: string) {
    await this.checkOwnership(userId, novelId);

    await this.prisma.novel.delete({
      where: { id: novelId },
    });

    return { message: '删除成功' };
  }

  async getStats(userId: string, novelId: string) {
    await this.checkOwnership(userId, novelId);

    const [chapterCount, totalWords, settingCount] = await Promise.all([
      this.prisma.chapter.count({ where: { novelId } }),
      this.prisma.chapter.aggregate({
        where: { novelId },
        _sum: { wordCount: true },
      }),
      this.prisma.setting.count({ where: { novelId } }),
    ]);

    return {
      chapterCount,
      totalWords: totalWords._sum.wordCount || 0,
      settingCount,
    };
  }

  private async checkOwnership(userId: string, novelId: string) {
    const novel = await this.prisma.novel.findUnique({
      where: { id: novelId },
      select: { userId: true },
    });

    if (!novel) {
      throw new NotFoundException('小说不存在');
    }

    if (novel.userId !== userId) {
      throw new ForbiddenException('无权访问此小说');
    }
  }
}
