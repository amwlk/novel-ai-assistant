import { IsString, IsOptional, IsNumber, Min, Max, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GenerateTextDto {
  @ApiProperty({ example: 'uuid' })
  @IsString()
  novelId: string;

  @ApiProperty({ example: '生成一个玄幻小说的开头' })
  @IsString()
  prompt: string;

  @ApiPropertyOptional({ example: 'doubao' })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiPropertyOptional({ example: 0.7 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  temperature?: number;

  @ApiPropertyOptional({ example: 3000 })
  @IsOptional()
  @IsNumber()
  @Min(100)
  maxTokens?: number;

  @ApiPropertyOptional({ example: ['突出主角性格', '设置悬念'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requirements?: string[];
}

export class PolishTextDto {
  @ApiProperty({ example: '需要润色的文本内容...' })
  @IsString()
  text: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  removeAI?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  unifyStyle?: boolean;
}

export class ContinueStoryDto {
  @ApiProperty({ example: 'uuid' })
  @IsString()
  chapterId: string;

  @ApiProperty({ example: '接下来可能发生...' })
  @IsString()
  prompt: string;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsNumber()
  suggestions?: number;
}
