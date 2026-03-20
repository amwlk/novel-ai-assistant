import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { GenerateTextDto, PolishTextDto, ContinueStoryDto } from './dto/ai.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { ResponseDto } from '@/common/dto/response.dto';
import { RequestWithUser } from '@/common/types/request';

@ApiTags('AI')
@Controller('ai')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('generate')
  @ApiOperation({ summary: '生成文本' })
  async generateText(@Request() req: RequestWithUser, @Body() dto: GenerateTextDto) {
    const result = await this.aiService.generateText(req.user.userId, dto);
    return ResponseDto.success(result);
  }

  @Post('polish')
  @ApiOperation({ summary: '润色文本' })
  async polishText(@Request() req: RequestWithUser, @Body() dto: PolishTextDto) {
    const result = await this.aiService.polishText(req.user.userId, dto);
    return ResponseDto.success(result);
  }

  @Post('continue')
  @ApiOperation({ summary: '续写故事' })
  async continueStory(@Request() req: RequestWithUser, @Body() dto: ContinueStoryDto) {
    const result = await this.aiService.continueStory(req.user.userId, dto);
    return ResponseDto.success(result);
  }
}
