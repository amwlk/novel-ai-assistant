import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { UpdateUserDto, UpdatePersonalStyleDto, ChangePasswordDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        avatarUrl: true,
        isActive: true,
        createdAt: true,
        personalStyle: true,
      },
    });

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    return user;
  }

  async update(userId: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: dto,
      select: {
        id: true,
        email: true,
        username: true,
        avatarUrl: true,
      },
    });

    return user;
  }

  async updatePersonalStyle(userId: string, dto: UpdatePersonalStyleDto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { personalStyle: dto.personalStyle },
      select: {
        id: true,
        personalStyle: true,
      },
    });

    return user;
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    const isPasswordValid = await bcrypt.compare(dto.oldPassword, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('原密码错误');
    }

    const passwordHash = await bcrypt.hash(dto.newPassword, 10);

    await this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    });

    return { message: '密码修改成功' };
  }

  async getStats(userId: string) {
    const novels = await this.prisma.novel.count({
      where: { userId },
    });

    const chapters = await this.prisma.chapter.count({
      where: { novel: { userId } },
    });

    const totalWords = await this.prisma.novel.aggregate({
      where: { userId },
      _sum: { totalWords: true },
    });

    return {
      novelCount: novels,
      chapterCount: chapters,
      totalWords: totalWords._sum.totalWords || 0,
    };
  }
}
