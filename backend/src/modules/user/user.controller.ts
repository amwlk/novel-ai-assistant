import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto, UpdatePersonalStyleDto, ChangePasswordDto } from './dto/user.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { ResponseDto } from '@/common/dto/response.dto';
import { RequestWithUser } from '@/common/types/request';

@ApiTags('用户')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @ApiOperation({ summary: '获取当前用户信息' })
  async getCurrentUser(@Request() req: RequestWithUser) {
    const user = await this.userService.findById(req.user.userId);
    return ResponseDto.success(user);
  }

  @Put('me')
  @ApiOperation({ summary: '更新用户信息' })
  async updateUser(@Request() req: RequestWithUser, @Body() dto: UpdateUserDto) {
    const user = await this.userService.update(req.user.userId, dto);
    return ResponseDto.success(user, '更新成功');
  }

  @Put('me/style')
  @ApiOperation({ summary: '更新个人创作风格' })
  async updatePersonalStyle(@Request() req: RequestWithUser, @Body() dto: UpdatePersonalStyleDto) {
    const user = await this.userService.updatePersonalStyle(req.user.userId, dto);
    return ResponseDto.success(user, '更新成功');
  }

  @Put('me/password')
  @ApiOperation({ summary: '修改密码' })
  async changePassword(@Request() req: RequestWithUser, @Body() dto: ChangePasswordDto) {
    const result = await this.userService.changePassword(req.user.userId, dto);
    return ResponseDto.success(result);
  }

  @Get('me/stats')
  @ApiOperation({ summary: '获取用户统计信息' })
  async getStats(@Request() req: RequestWithUser) {
    const stats = await this.userService.getStats(req.user.userId);
    return ResponseDto.success(stats);
  }
}
