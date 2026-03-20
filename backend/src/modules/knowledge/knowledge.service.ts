import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CreateKnowledgeDto, UpdateKnowledgeDto, SearchKnowledgeDto, KnowledgeType } from './dto/knowledge.dto';

@Injectable()
export class KnowledgeService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateKnowledgeDto) {
    const knowledge = await this.prisma.knowledgeBase.create({
      data: {
        userId,
        novelId: dto.novelId,
        type: dto.type,
        content: dto.content,
        tags: dto.tags || [],
        metadata: dto.metadata || {},
      },
    });

    return knowledge;
  }

  async findAll(userId: string, novelId?: string, type?: KnowledgeType, page = 1, pageSize = 20) {
    const where: any = { userId };
    if (novelId) {
      where.novelId = novelId;
    }
    if (type) {
      where.type = type;
    }

    const [items, total] = await Promise.all([
      this.prisma.knowledgeBase.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.knowledgeBase.count({ where }),
    ]);

    return { items, total, page, pageSize };
  }

  async findOne(userId: string, id: string) {
    const knowledge = await this.prisma.knowledgeBase.findFirst({
      where: { id, userId },
    });

    if (!knowledge) {
      throw new NotFoundException('知识库条目不存在');
    }

    return knowledge;
  }

  async update(userId: string, id: string, dto: UpdateKnowledgeDto) {
    await this.findOne(userId, id);

    const updated = await this.prisma.knowledgeBase.update({
      where: { id },
      data: dto,
    });

    return updated;
  }

  async delete(userId: string, id: string) {
    await this.findOne(userId, id);

    await this.prisma.knowledgeBase.delete({
      where: { id },
    });

    return { message: '删除成功' };
  }

  async search(userId: string, dto: SearchKnowledgeDto) {
    const where: any = { userId };
    if (dto.novelId) {
      where.novelId = dto.novelId;
    }

    const items = await this.prisma.knowledgeBase.findMany({
      where: {
        ...where,
        OR: [
          { content: { contains: dto.query, mode: 'insensitive' } },
          { tags: { hasSome: [dto.query] } },
        ],
      },
      take: dto.limit || 10,
    });

    return items;
  }

  async batchCreate(userId: string, items: CreateKnowledgeDto[]) {
    const data = items.map((item) => ({
      userId,
      novelId: item.novelId,
      type: item.type,
      content: item.content,
      tags: item.tags || [],
      metadata: item.metadata || {},
    }));

    const result = await this.prisma.knowledgeBase.createMany({
      data,
    });

    return { count: result.count };
  }
}
