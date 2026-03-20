import { IsString, IsOptional, IsArray, IsEnum, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum KnowledgeType {
  PERSONAL_STYLE = 'PERSONAL_STYLE',
  PERSONAL_TEMPLATE = 'PERSONAL_TEMPLATE',
  NOVEL_SETTING = 'NOVEL_SETTING',
  NOVEL_OUTLINE = 'NOVEL_OUTLINE',
  NOVEL_CHAPTER = 'NOVEL_CHAPTER',
  NOVEL_CHARACTER = 'NOVEL_CHARACTER',
  NOVEL_WORLD = 'NOVEL_WORLD',
  OTHER = 'OTHER',
}

export class CreateKnowledgeDto {
  @ApiPropertyOptional({ example: 'uuid' })
  @IsOptional()
  @IsString()
  novelId?: string;

  @ApiProperty({ enum: KnowledgeType, example: KnowledgeType.NOVEL_SETTING })
  @IsEnum(KnowledgeType)
  type: KnowledgeType;

  @ApiProperty({ example: '知识库内容...' })
  @IsString()
  content: string;

  @ApiPropertyOptional({ example: ['设定', '人物'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ example: {} })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

export class UpdateKnowledgeDto {
  @ApiPropertyOptional({ example: '更新后的内容...' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ example: ['设定', '人物', '成长'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}

export class SearchKnowledgeDto {
  @ApiPropertyOptional({ example: 'uuid' })
  @IsOptional()
  @IsString()
  novelId?: string;

  @ApiProperty({ example: '主角设定' })
  @IsString()
  query: string;

  @ApiPropertyOptional({ example: 'hybrid' })
  @IsOptional()
  @IsString()
  searchType?: 'keyword' | 'semantic' | 'hybrid';

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  limit?: number;
}
