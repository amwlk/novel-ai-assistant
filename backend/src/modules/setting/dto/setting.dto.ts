import { IsString, IsOptional, IsArray, IsEnum, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum SettingType {
  CHARACTER = 'CHARACTER',
  WORLDVIEW = 'WORLDVIEW',
  PLOT = 'PLOT',
  CONFLICT = 'CONFLICT',
  ITEM = 'ITEM',
  SCENE = 'SCENE',
  FACTION = 'FACTION',
  CULTIVATION = 'CULTIVATION',
  RELATIONSHIP = 'RELATIONSHIP',
  CUSTOM = 'CUSTOM',
}

export class CreateSettingDto {
  @ApiProperty({ example: 'uuid' })
  @IsString()
  novelId: string;

  @ApiProperty({ enum: SettingType, example: SettingType.CHARACTER })
  @IsEnum(SettingType)
  type: SettingType;

  @ApiProperty({ example: '主角' })
  @IsString()
  name: string;

  @ApiProperty({ example: '主角设定内容...' })
  @IsString()
  content: string;

  @ApiPropertyOptional({ example: ['主角', '男性'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ example: { gender: 'male', age: 20 } })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

export class UpdateSettingDto {
  @ApiPropertyOptional({ example: '更新后的内容...' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ example: ['主角', '男性', '成长'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ example: { age: 21 } })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
