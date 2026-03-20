import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { KnowledgeService } from './knowledge.service';
import { CreateKnowledgeDto, UpdateKnowledgeDto, SearchKnowledgeDto, KnowledgeType } from './dto/knowledge.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { ResponseDto, PaginatedResponseDto } from '@/common/dto/response.dto';
import { RequestWithUser } from '@/common/types/request';

@ApiTags('知识库')
@Controller('knowledge')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class KnowledgeController {
  constructor(private knowledgeService: KnowledgeService) {}

  @Post()
  @ApiOperation({ summary: '创建知识库条目' })
  async create(@Request() req: RequestWithUser, @Body() dto: CreateKnowledgeDto) {
    const knowledge = await this.knowledgeService.create(req.user.userId, dto);
    return ResponseDto.success(knowledge, '创建成功');
  }

  @Post('batch')
  @ApiOperation({ summary: '批量创建知识库条目' })
  async batchCreate(@Request() req: RequestWithUser, @Body() items: CreateKnowledgeDto[]) {
    const result = await this.knowledgeService.batchCreate(req.user.userId, items);
    return ResponseDto.success(result);
  }

  @Get()
  @ApiOperation({ summary: '获取知识库列表' })
  @ApiQuery({ name: 'novelId', required: false })
  @ApiQuery({ name: 'type', required: false, enum: KnowledgeType })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  async findAll(
    @Request() req: RequestWithUser,
    @Query('novelId') novelId?: string,
    @Query('type') type?: KnowledgeType,
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 20,
  ) {
    const result = await this.knowledgeService.findAll(req.user.userId, novelId, type, +page, +pageSize);
    return new PaginatedResponseDto(result.items, result.total, result.page, result.pageSize);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取知识库条目详情' })
  async findOne(@Request() req: RequestWithUser, @Param('id') id: string) {
    const knowledge = await this.knowledgeService.findOne(req.user.userId, id);
    return ResponseDto.success(knowledge);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新知识库条目' })
  async update(@Request() req: RequestWithUser, @Param('id') id: string, @Body() dto: UpdateKnowledgeDto) {
    const knowledge = await this.knowledgeService.update(req.user.userId, id, dto);
    return ResponseDto.success(knowledge, '更新成功');
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除知识库条目' })
  async delete(@Request() req: RequestWithUser, @Param('id') id: string) {
    const result = await this.knowledgeService.delete(req.user.userId, id);
    return ResponseDto.success(result);
  }

  @Post('search')
  @ApiOperation({ summary: '搜索知识库' })
  async search(@Request() req: RequestWithUser, @Body() dto: SearchKnowledgeDto) {
    const items = await this.knowledgeService.search(req.user.userId, dto);
    return ResponseDto.success(items);
  }
}
