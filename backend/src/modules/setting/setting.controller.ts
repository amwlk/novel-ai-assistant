import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { SettingService } from './setting.service';
import { CreateSettingDto, UpdateSettingDto, SettingType } from './dto/setting.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { ResponseDto, PaginatedResponseDto } from '@/common/dto/response.dto';
import { RequestWithUser } from '@/common/types/request';

@ApiTags('设定')
@Controller('settings')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SettingController {
  constructor(private settingService: SettingService) {}

  @Post()
  @ApiOperation({ summary: '创建设定' })
  async create(@Request() req: RequestWithUser, @Body() dto: CreateSettingDto) {
    const setting = await this.settingService.create(req.user.userId, dto);
    return ResponseDto.success(setting, '创建成功');
  }

  @Get()
  @ApiOperation({ summary: '获取设定列表' })
  @ApiQuery({ name: 'novelId', required: true })
  @ApiQuery({ name: 'type', required: false, enum: SettingType })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  async findAll(
    @Query('novelId') novelId: string,
    @Query('type') type?: SettingType,
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 20,
  ) {
    const result = await this.settingService.findAll(novelId, type, +page, +pageSize);
    return new PaginatedResponseDto(result.settings, result.total, result.page, result.pageSize);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取设定详情' })
  async findOne(@Request() req: RequestWithUser, @Param('id') id: string) {
    const setting = await this.settingService.findOne(req.user.userId, id);
    return ResponseDto.success(setting);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新设定' })
  async update(@Request() req: RequestWithUser, @Param('id') id: string, @Body() dto: UpdateSettingDto) {
    const setting = await this.settingService.update(req.user.userId, id, dto);
    return ResponseDto.success(setting, '更新成功');
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除设定' })
  async delete(@Request() req: RequestWithUser, @Param('id') id: string) {
    const result = await this.settingService.delete(req.user.userId, id);
    return ResponseDto.success(result);
  }

  @Get(':id/versions')
  @ApiOperation({ summary: '获取设定版本历史' })
  async getVersions(@Request() req: RequestWithUser, @Param('id') id: string) {
    const versions = await this.settingService.getVersions(req.user.userId, id);
    return ResponseDto.success(versions);
  }
}
