import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CreateSettingDto, UpdateSettingDto, SettingType } from './dto/setting.dto';

@Injectable()
export class SettingService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateSettingDto) {
    await this.checkNovelOwnership(userId, dto.novelId);

    const setting = await this.prisma.setting.create({
      data: {
        novelId: dto.novelId,
        type: dto.type,
        name: dto.name,
        content: dto.content,
        tags: dto.tags || [],
        metadata: dto.metadata || {},
      },
    });

    return setting;
  }

  async findAll(novelId: string, type?: SettingType, page = 1, pageSize = 20) {
    const where: any = { novelId };
    if (type) {
      where.type = type;
    }

    const [settings, total] = await Promise.all([
      this.prisma.setting.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.setting.count({ where }),
    ]);

    return { settings, total, page, pageSize };
  }

  async findOne(userId: string, settingId: string) {
    const setting = await this.prisma.setting.findUnique({
      where: { id: settingId },
      include: { novel: { select: { userId: true } } },
    });

    if (!setting) {
      throw new NotFoundException('设定不存在');
    }

    if (setting.novel.userId !== userId) {
      throw new ForbiddenException('无权访问此设定');
    }

    return setting;
  }

  async update(userId: string, settingId: string, dto: UpdateSettingDto) {
    const setting = await this.findOne(userId, settingId);

    const updated = await this.prisma.setting.update({
      where: { id: settingId },
      data: {
        ...dto,
        version: { increment: 1 },
      },
    });

    return updated;
  }

  async delete(userId: string, settingId: string) {
    await this.findOne(userId, settingId);

    await this.prisma.setting.delete({
      where: { id: settingId },
    });

    return { message: '删除成功' };
  }

  async getVersions(userId: string, settingId: string) {
    await this.findOne(userId, settingId);

    const versions = await this.prisma.setting.findMany({
      where: { id: settingId },
      orderBy: { version: 'desc' },
    });

    return versions;
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
}
