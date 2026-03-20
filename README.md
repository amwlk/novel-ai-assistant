# 长篇小说AI助手平台

> 网文创作者专属的AI创作提效平台

## 项目简介

长篇小说AI助手平台是一个专业的网文创作辅助工具，旨在解决长篇网文创作的四大核心痛点：

1. **设定管理混乱** - 12大弹性要素统一管理
2. **长篇崩设定** - 修改自动同步，版本追溯
3. **创作效率低下** - AI智能生成，效率提升10倍
4. **工具分散** - 一站式创作平台

## 技术栈

### 后端
- **框架**: NestJS 10
- **数据库**: PostgreSQL 15 + Prisma ORM
- **缓存**: Redis 7
- **认证**: JWT + Passport
- **AI集成**: 豆包、文心一言、通义千问、智谱清言

### 前端
- **框架**: Next.js 16 (App Router)
- **样式**: Tailwind CSS 4
- **状态管理**: Zustand
- **数据请求**: TanStack Query + Axios
- **图标**: Lucide React

## 项目结构

```
no-ai/
├── backend/                 # 后端服务
│   ├── src/
│   │   ├── modules/        # 业务模块
│   │   │   ├── auth/       # 认证模块
│   │   │   ├── user/       # 用户模块
│   │   │   ├── novel/      # 小说模块
│   │   │   ├── setting/    # 设定模块
│   │   │   ├── chapter/    # 章节模块
│   │   │   ├── knowledge/  # 知识库模块
│   │   │   └── ai/         # AI模块
│   │   ├── common/         # 公共模块
│   │   └── main.ts         # 入口文件
│   ├── prisma/             # 数据库模型
│   └── package.json
│
├── frontend/               # 前端服务
│   ├── src/
│   │   ├── app/           # 页面路由
│   │   ├── components/    # 组件
│   │   └── lib/           # 工具库
│   └── package.json
│
├── docs/                   # 项目文档
├── docker-compose.yml      # Docker配置
└── README.md              # 项目说明
```

## 快速开始

### 环境要求
- Node.js 20+
- pnpm 10+
- Docker & Docker Compose
- PostgreSQL 15+ (或使用Docker)
- Redis 7+ (或使用Docker)

### 安装步骤

1. **克隆仓库**
```bash
git clone https://github.com/你的用户名/novel-ai-assistant.git
cd novel-ai-assistant
```

2. **启动数据库**
```bash
docker compose up -d
```

3. **安装后端依赖**
```bash
cd backend
pnpm install
npx prisma generate
npx prisma migrate dev
```

4. **安装前端依赖**
```bash
cd ../frontend
pnpm install
```

5. **启动服务**
```bash
# 后端 (终端1)
cd backend
pnpm start:dev

# 前端 (终端2)
cd frontend
pnpm dev
```

6. **访问应用**
- 前端: http://localhost:3000
- 后端API: http://localhost:3002
- API文档: http://localhost:3002/api/docs

## 核心功能

### 1. 12大弹性要素设定系统
- 人物设定
- 世界观
- 情节主线
- 核心冲突
- 道具信物
- 场景地点
- 势力体系
- 人物关系
- 修炼体系
- 大纲管理
- 伏笔追踪
- 自定义要素

### 2. AI智能生成
- 多模型集成（豆包、文心、通义、智谱）
- 上下文感知生成
- 风格可调节
- 批量生成

### 3. 双层知识库
- 个人风格层
- 小说专属层
- 智能检索

### 4. 智能润色
- 去AI痕迹
- 风格统一
- 合规校验

## API文档

启动后端服务后访问: http://localhost:3002/api/docs

## 开发指南

### 代码规范
- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化
- 遵循 TypeScript 严格模式

### 提交规范
```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式调整
refactor: 重构
test: 测试相关
chore: 构建/工具相关
```

## 部署

### Docker部署
```bash
docker compose -f docker-compose.prod.yml up -d
```

### 手动部署
1. 构建前端: `cd frontend && pnpm build`
2. 构建后端: `cd backend && pnpm build`
3. 使用 PM2 或 systemd 管理进程

## 许可证

MIT License

## 联系方式

- 问题反馈: 提交 Issue
- 功能建议: 提交 Feature Request

---

© 2026 长篇小说AI助手平台
