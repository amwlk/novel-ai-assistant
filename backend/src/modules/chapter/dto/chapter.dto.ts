import { IsString, IsOptional, IsNumber, Min, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum ChapterStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export class CreateChapterDto {
  @ApiProperty({ example: 'uuid' })
  @IsString()
  novelId: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Min(1)
  chapterNumber: number;

  @ApiProperty({ example: '第一章：开局' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: '章节内容...' })
  @IsOptional()
  @IsString()
  content?: string;
}

export class UpdateChapterDto {
  @ApiPropertyOptional({ example: '新标题' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: '更新后的内容...' })
  @IsOptional()
  @IsString()
  content?: string;
}

export class GenerateChapterDto {
  @ApiProperty({ example: 'uuid' })
  @IsString()
  novelId: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Min(1)
  chapterNumber: number;

  @ApiProperty({ example: '第一章：开局' })
  @IsString()
  title: string;

  @ApiProperty({ example: '主角在宗门试炼中突破...' })
  @IsString()
  prompt: string;

  @ApiPropertyOptional({ example: { model: 'doubao', temperature: 0.7 } })
  @IsOptional()
  options?: Record<string, any>;
}
