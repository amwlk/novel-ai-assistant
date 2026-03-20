import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { NovelService } from './novel.service';
import { CreateNovelDto, UpdateNovelDto, UpdateNovelStatusDto } from './dto/novel.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { ResponseDto, PaginatedResponseDto } from '@/common/dto/response.dto';
import { RequestWithUser } from '@/common/types/request';

@ApiTags('小说')
@Controller('novels')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class NovelController {
  constructor(private novelService: NovelService) {}

  @Post()
  @ApiOperation({ summary: '创建小说' })
  async create(@Request() req: RequestWithUser, @Body() dto: CreateNovelDto) {
    const novel = await this.novelService.create(req.user.userId, dto);
    return ResponseDto.success(novel, '创建成功');
  }

  @Get()
  @ApiOperation({ summary: '获取小说列表' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, type: String })
  async findAll(
    @Request() req: RequestWithUser,
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 20,
    @Query('status') status?: string,
  ) {
    const result = await this.novelService.findAll(req.user.userId, +page, +pageSize, status);
    return new PaginatedResponseDto(result.novels, result.total, result.page, result.pageSize);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取小说详情' })
  async findOne(@Request() req: RequestWithUser, @Param('id') id: string) {
    const novel = await this.novelService.findOne(req.user.userId, id);
    return ResponseDto.success(novel);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新小说' })
  async update(@Request() req: RequestWithUser, @Param('id') id: string, @Body() dto: UpdateNovelDto) {
    const novel = await this.novelService.update(req.user.userId, id, dto);
    return ResponseDto.success(novel, '更新成功');
  }

  @Put(':id/status')
  @ApiOperation({ summary: '更新小说状态' })
  async updateStatus(@Request() req: RequestWithUser, @Param('id') id: string, @Body() dto: UpdateNovelStatusDto) {
    const novel = await this.novelService.updateStatus(req.user.userId, id, dto);
    return ResponseDto.success(novel, '更新成功');
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除小说' })
  async delete(@Request() req: RequestWithUser, @Param('id') id: string) {
    const result = await this.novelService.delete(req.user.userId, id);
    return ResponseDto.success(result);
  }

  @Get(':id/stats')
  @ApiOperation({ summary: '获取小说统计信息' })
  async getStats(@Request() req: RequestWithUser, @Param('id') id: string) {
    const stats = await this.novelService.getStats(req.user.userId, id);
    return ResponseDto.success(stats);
  }
}
