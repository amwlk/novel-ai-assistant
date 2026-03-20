import { IsString, IsNotEmpty, IsOptional, IsEnum, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum NovelStatus {
  DRAFT = 'draft',
  WRITING = 'writing',
  COMPLETED = 'completed',
}

export class CreateNovelDto {
  @ApiProperty({ example: '我的小说' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @ApiProperty({ example: '玄幻' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiPropertyOptional({ example: '作者笔名' })
  @IsOptional()
  @IsString()
  penName?: string;
}

export class UpdateNovelDto {
  @ApiPropertyOptional({ example: '新标题' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @ApiPropertyOptional({ example: '仙侠' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: '新笔名' })
  @IsOptional()
  @IsString()
  penName?: string;
}

export class UpdateNovelStatusDto {
  @ApiProperty({ enum: NovelStatus })
  @IsEnum(NovelStatus)
  status: NovelStatus;
}
