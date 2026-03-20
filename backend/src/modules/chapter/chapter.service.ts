import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CreateChapterDto, UpdateChapterDto, ChapterStatus } from './dto/chapter.dto';

@Injectable()
export class ChapterService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateChapterDto) {
    await this.checkNovelOwnership(userId, dto.novelId);

    const chapter = await this.prisma.chapter.create({
      data: {
        novelId: dto.novelId,
        chapterNumber: dto.chapterNumber,
        title: dto.title,
        content: dto.content || '',
        wordCount: dto.content?.length || 0,
      },
    });

    await this.updateNovelStats(dto.novelId);

    return chapter;
  }

  async findAll(novelId: string, page = 1, pageSize = 20, status?: ChapterStatus) {
    const where: any = { novelId };
    if (status) {
      where.status = status;
    }

    const [chapters, total] = await Promise.all([
      this.prisma.chapter.findMany({
        where,
        orderBy: { chapterNumber: 'asc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.chapter.count({ where }),
    ]);

    return { chapters, total, page, pageSize };
  }

  async findOne(userId: string, chapterId: string) {
    const chapter = await this.prisma.chapter.findUnique({
      where: { id: chapterId },
      include: { novel: { select: { userId: true } } },
    });

    if (!chapter) {
      throw new NotFoundException('章节不存在');
    }

    if (chapter.novel.userId !== userId) {
      throw new ForbiddenException('无权访问此章节');
    }

    return chapter;
  }

  async update(userId: string, chapterId: string, dto: UpdateChapterDto) {
    const chapter = await this.findOne(userId, chapterId);

    const updated = await this.prisma.chapter.update({
      where: { id: chapterId },
      data: {
        ...dto,
        wordCount: dto.content?.length || chapter.wordCount,
      },
    });

    await this.updateNovelStats(chapter.novelId);

    return updated;
  }

  async delete(userId: string, chapterId: string) {
    const chapter = await this.findOne(userId, chapterId);
    const novelId = chapter.novelId;

    await this.prisma.chapter.delete({
      where: { id: chapterId },
    });

    await this.updateNovelStats(novelId);

    return { message: '删除成功' };
  }

  async publish(userId: string, chapterId: string) {
    const chapter = await this.findOne(userId, chapterId);

    const updated = await this.prisma.chapter.update({
      where: { id: chapterId },
      data: {
        status: ChapterStatus.PUBLISHED,
        publishedAt: new Date(),
      },
    });

    return updated;
  }

  private async checkNovelOwnership(userId: string, novelId: string) {
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

  private async updateNovelStats(novelId: string) {
    const stats = await this.prisma.chapter.aggregate({
      where: { novelId },
      _count: true,
      _sum: { wordCount: true },
    });

    await this.prisma.novel.update({
      where: { id: novelId },
      data: {
        totalChapters: stats._count,
        totalWords: stats._sum.wordCount || 0,
      },
    });
  }
}
