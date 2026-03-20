import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/common/prisma/prisma.service';
import { GenerateTextDto, PolishTextDto, ContinueStoryDto } from './dto/ai.dto';
import axios from 'axios';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  async generateText(userId: string, dto: GenerateTextDto) {
    const novel = await this.prisma.novel.findUnique({
      where: { id: dto.novelId },
      include: {
        settings: { take: 20 },
        chapters: {
          orderBy: { chapterNumber: 'desc' },
          take: 3,
        },
      },
    });

    if (!novel) {
      throw new Error('小说不存在');
    }

    const context = this.buildContext(novel, dto.prompt);
    
    const model = dto.model || 'doubao';
    const response = await this.callAI(model, context, {
      temperature: dto.temperature || 0.7,
      maxTokens: dto.maxTokens || 3000,
    });

    return {
      content: response,
      model,
      wordCount: response.length,
    };
  }

  async polishText(userId: string, dto: PolishTextDto) {
    const prompt = this.buildPolishPrompt(dto);
    
    const response = await this.callAI('ernie', prompt, {
      temperature: 0.5,
      maxTokens: 4000,
    });

    return {
      original: dto.text,
      polished: response,
      wordCount: response.length,
    };
  }

  async continueStory(userId: string, dto: ContinueStoryDto) {
    const chapter = await this.prisma.chapter.findUnique({
      where: { id: dto.chapterId },
      include: {
        novel: {
          include: {
            settings: { take: 10 },
          },
        },
      },
    });

    if (!chapter) {
      throw new Error('章节不存在');
    }

    const prompt = this.buildContinuePrompt(chapter, dto);
    
    const response = await this.callAI('qwen', prompt, {
      temperature: 0.8,
      maxTokens: 2000,
    });

    return {
      suggestions: [response],
      chapterId: dto.chapterId,
    };
  }

  private buildContext(novel: any, prompt: string): string {
    let context = `小说标题：${novel.title}\n`;
    context += `题材：${novel.category}\n\n`;
    
    if (novel.settings.length > 0) {
      context += '设定信息：\n';
      novel.settings.forEach((setting: any) => {
        context += `- ${setting.name}(${setting.type}): ${setting.content.substring(0, 500)}\n`;
      });
      context += '\n';
    }

    if (novel.chapters.length > 0) {
      context += '最近的章节摘要：\n';
      novel.chapters.forEach((chapter: any) => {
        context += `- 第${chapter.chapterNumber}章 ${chapter.title}: ${chapter.content?.substring(0, 300)}...\n`;
      });
      context += '\n';
    }

    context += `任务：${prompt}`;

    return context;
  }

  private buildPolishPrompt(dto: PolishTextDto): string {
    let prompt = '请对以下文本进行润色：\n\n';
    
    if (dto.removeAI) {
      prompt += '要求：\n1. 去除AI生成的痕迹，使文本更加自然\n';
    }
    if (dto.unifyStyle) {
      prompt += '2. 统一文本风格，保持一致性\n';
    }
    
    prompt += '\n原文：\n' + dto.text;
    
    return prompt;
  }

  private buildContinuePrompt(chapter: any, dto: ContinueStoryDto): string {
    let prompt = `基于以下章节内容，续写故事：\n\n`;
    prompt += `第${chapter.chapterNumber}章 ${chapter.title}\n`;
    prompt += chapter.content?.substring(0, 2000) + '...\n\n';
    prompt += `续写方向：${dto.prompt}\n\n`;
    prompt += `请提供${dto.suggestions || 1}个续写建议。`;

    return prompt;
  }

  private async callAI(model: string, prompt: string, options: { temperature: number; maxTokens: number }): Promise<string> {
    try {
      switch (model) {
        case 'doubao':
          return await this.callDoubao(prompt, options);
        case 'ernie':
          return await this.callErnie(prompt, options);
        case 'qwen':
          return await this.callQwen(prompt, options);
        case 'zhipu':
          return await this.callZhipu(prompt, options);
        default:
          return await this.callDoubao(prompt, options);
      }
    } catch (error) {
      this.logger.error(`AI调用失败: ${error.message}`);
      throw new Error(`AI生成失败: ${error.message}`);
    }
  }

  private async callDoubao(prompt: string, options: { temperature: number; maxTokens: number }): Promise<string> {
    const apiKey = this.configService.get('DOUBAO_API_KEY');
    const apiUrl = this.configService.get('DOUBAO_API_URL') || 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';
    
    if (!apiKey) {
      return this.mockResponse(prompt);
    }

    const response = await axios.post(
      apiUrl,
      {
        model: this.configService.get('DOUBAO_MODEL') || 'doubao-pro-32k',
        messages: [{ role: 'user', content: prompt }],
        temperature: options.temperature,
        max_tokens: options.maxTokens,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data.choices[0].message.content;
  }

  private async callErnie(prompt: string, options: { temperature: number; maxTokens: number }): Promise<string> {
    const apiKey = this.configService.get('ERNIE_API_KEY');
    
    if (!apiKey) {
      return this.mockResponse(prompt);
    }

    const apiUrl = `https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions?access_token=${apiKey}`;
    
    const response = await axios.post(
      apiUrl,
      {
        messages: [{ role: 'user', content: prompt }],
        temperature: options.temperature,
      },
    );

    return response.data.result;
  }

  private async callQwen(prompt: string, options: { temperature: number; maxTokens: number }): Promise<string> {
    const apiKey = this.configService.get('QWEN_API_KEY');
    
    if (!apiKey) {
      return this.mockResponse(prompt);
    }

    const apiUrl = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation';
    
    const response = await axios.post(
      apiUrl,
      {
        model: 'qwen-max',
        input: { messages: [{ role: 'user', content: prompt }] },
        parameters: {
          temperature: options.temperature,
          max_tokens: options.maxTokens,
        },
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data.output.text;
  }

  private async callZhipu(prompt: string, options: { temperature: number; maxTokens: number }): Promise<string> {
    const apiKey = this.configService.get('ZHIPU_API_KEY');
    
    if (!apiKey) {
      return this.mockResponse(prompt);
    }

    const apiUrl = 'https://openai.zhipuai.com/v1/chat/completions';
    
    const response = await axios.post(
      apiUrl,
      {
        model: 'glm-4-plus',
        messages: [{ role: 'user', content: prompt }],
        temperature: options.temperature,
        max_tokens: options.maxTokens,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data.choices[0].message.content;
  }

  private mockResponse(prompt: string): string {
    return `【AI生成内容 - 演示模式】

这是一个演示响应。要启用真实的AI生成功能，请在 .env 文件中配置相应的 API 密钥：

- DOUBAO_API_KEY: 豆包 API 密钥
- ERNIE_API_KEY: 文心一言 API 密钥  
- QWEN_API_KEY: 通义千问 API 密钥
- ZHIPU_API_KEY: 智谱清言 API 密钥

您的提示词是：${prompt.substring(0, 100)}...

配置完成后，AI将根据您的设定和上下文生成高质量的小说内容。`;
  }
}
