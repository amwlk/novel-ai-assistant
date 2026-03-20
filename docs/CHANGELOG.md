# 开发日志

## 2026-03-20 项目初始化

### 项目背景
从宿主机 Windows 的 `C:\长篇小说AI助手` 目录拷贝项目文档到虚拟机工作目录 `/home/amwlk/no-ai`。

### 开发环境搭建

#### 1. 环境检查
- Node.js: v20.20.1 ✓
- pnpm: 10.32.1 ✓
- Docker: 已安装 ✓

#### 2. 数据库配置
- PostgreSQL: Docker 容器，端口 5433
- Redis: 本地运行，端口 6379

#### 3. VMware 共享文件夹配置
- 安装 open-vm-tools
- 挂载共享文件夹到 /mnt/hgfs/
- 成功访问宿主机文件

### 后端开发

#### 技术栈
- 框架: NestJS 10
- ORM: Prisma 5
- 数据库: PostgreSQL 15
- 缓存: Redis 7
- 认证: JWT + Passport

#### 模块结构
```
backend/src/modules/
├── auth/          # 认证模块
├── user/          # 用户模块
├── novel/         # 小说模块
├── setting/       # 设定模块
├── chapter/       # 章节模块
├── knowledge/     # 知识库模块
└── ai/            # AI集成模块
```

#### 数据库模型
- User: 用户表
- Novel: 小说表
- Setting: 设定表（支持12大弹性要素）
- Chapter: 章节表
- KnowledgeBase: 知识库表
- Outline: 大纲表
- Reminder: 提醒表
- ExportTask: 导出任务表
- TaskQueue: 任务队列表
- Task: 任务表

#### 遇到的问题及解决

1. **bcrypt 编译问题**
   - 问题: bcrypt 模块编译失败
   - 解决: 替换为 bcryptjs（纯 JS 实现）

2. **TypeScript 类型错误**
   - 问题: @Request() 装饰器的 req 参数隐式 any 类型
   - 解决: 创建 RequestWithUser 接口，显式声明类型

3. **端口冲突**
   - 问题: 后端默认端口 3001 与前端冲突
   - 解决: 修改后端端口为 3002

### 前端开发

#### 技术栈
- 框架: Next.js 16 (App Router)
- 样式: Tailwind CSS 4
- 状态管理: Zustand
- 数据请求: TanStack Query + Axios
- 图标: Lucide React

#### 页面结构
```
frontend/src/app/
├── page.tsx           # 官网首页
├── login/page.tsx     # 登录注册
├── novels/
│   ├── page.tsx       # 小说列表
│   ├── [id]/page.tsx  # 小说详情
│   └── [id]/write/    # 章节编辑器
├── features/          # 功能介绍
├── pricing/           # 价格方案
├── terms/             # 服务条款
├── privacy/           # 隐私政策
└── profile/           # 个人中心
```

#### UI 设计
- 配色: indigo → purple 渐变
- 布局: 响应式设计
- 组件: Button, Input, Textarea, Card
- 导航: 固定顶部导航栏 + 移动端菜单

### Git 版本控制

#### 仓库信息
- 仓库地址: https://github.com/amwlk/novel-ai-assistant
- 默认分支: main
- 提交数量: 1 (初始提交)

#### 提交记录
```
f847563 feat: 初始化项目 - 完整的长篇小说AI助手平台
```

### 服务状态

#### 运行中的服务
- 前端: http://localhost:3000
- 后端: http://localhost:3002
- API文档: http://localhost:3002/api/docs
- PostgreSQL: localhost:5433
- Redis: localhost:6379

#### Docker 容器
- novel-ai-postgres: 运行中

---

## 待办事项

### 高优先级
- [ ] 配置 AI API 密钥（豆包/文心/通义/智谱）
- [ ] 完善章节编辑器的自动保存功能
- [ ] 实现知识库的向量检索

### 中优先级
- [ ] 添加单元测试
- [ ] 添加 E2E 测试
- [ ] 优化移动端体验

### 低优先级
- [ ] 添加国际化支持
- [ ] 添加深色模式
- [ ] 添加 PWA 支持

---

## 更新日志

### v0.1.0 (2026-03-20)
- 初始化项目结构
- 完成后端核心模块
- 完成前端UI界面
- 建立Git版本控制
