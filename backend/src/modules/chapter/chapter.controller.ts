import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ChapterService } from './chapter.service';
import { CreateChapterDto, UpdateChapterDto, ChapterStatus } from './dto/chapter.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { ResponseDto, PaginatedResponseDto } from '@/common/dto/response.dto';
import { RequestWithUser } from '@/common/types/request';

@ApiTags('章节')
@Controller('chapters')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ChapterController {
  constructor(private chapterService: ChapterService) {}

  @Post()
  @ApiOperation({ summary: '创建章节' })
  async create(@Request() req: RequestWithUser, @Body() dto: CreateChapterDto) {
    const chapter = await this.chapterService.create(req.user.userId, dto);
    return ResponseDto.success(chapter, '创建成功');
  }

  @Get()
  @ApiOperation({ summary: '获取章节列表' })
  @ApiQuery({ name: 'novelId', required: true })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, enum: ChapterStatus })
  async findAll(
    @Query('novelId') novelId: string,
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 20,
    @Query('status') status?: ChapterStatus,
  ) {
    const result = await this.chapterService.findAll(novelId, +page, +pageSize, status);
    return new PaginatedResponseDto(result.chapters, result.total, result.page, result.pageSize);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取章节详情' })
  async findOne(@Request() req: RequestWithUser, @Param('id') id: string) {
    const chapter = await this.chapterService.findOne(req.user.userId, id);
    return ResponseDto.success(chapter);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新章节' })
  async update(@Request() req: RequestWithUser, @Param('id') id: string, @Body() dto: UpdateChapterDto) {
    const chapter = await this.chapterService.update(req.user.userId, id, dto);
    return ResponseDto.success(chapter, '更新成功');
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除章节' })
  async delete(@Request() req: RequestWithUser, @Param('id') id: string) {
    const result = await this.chapterService.delete(req.user.userId, id);
    return ResponseDto.success(result);
  }

  @Put(':id/publish')
  @ApiOperation({ summary: '发布章节' })
  async publish(@Request() req: RequestWithUser, @Param('id') id: string) {
    const chapter = await this.chapterService.publish(req.user.userId, id);
    return ResponseDto.success(chapter, '发布成功');
  }
}
