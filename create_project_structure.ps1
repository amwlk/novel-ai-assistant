# 创建项目结构和基础文档
$projectDir = "C:\长篇小说AI助手"

# 创建目录结构
$directories = @(
    "docs",
    "docs\01-项目方案",
    "docs\02-技术文档",
    "docs\03-API文档",
    "src",
    "src\frontend",
    "src\backend",
    "src\database",
    "src\ai",
    "config",
    "scripts",
    "tests",
    "backups",
    "data"
)

foreach ($dir in $directories) {
    $path = Join-Path $projectDir $dir
    if (-not (Test-Path $path)) {
        New-Item -ItemType Directory -Path $path -Force | Out-Null
        Write-Host "Created: $path"
    }
}

# 创建README.md
$readmeContent = @'
# 长篇小说AI助手平台

**版本**: v2.0  
**编制时间**: 2026年3月19日  
**项目状态**: 全面实施阶段  

---

## 📋 项目简介

**长篇小说AI助手平台**不是通用AI写作工具,而是**网文创作者专属的AI创作提效中台**。

### 核心价值主张

- 解决长篇网文创作的四大核心痛点:设定管理混乱、长篇崩设定、创作效率低下、工具分散
- 通过"12大弹性要素体系"和"双层知识库系统",让AI真正懂作者的作品
- 提供从设定搭建→情节铺陈→章节生成→内容优化的全流程提效

### 平台本质属性

- 纯工具定位,无社交功能
- 数据完全私有,用户可控
- 聚焦长篇网文创作(百万字级)
- 个人离线式创作辅助工具

---

## 🗂️ 项目结构

```
长篇小说AI助手/
├── docs/                    # 文档目录
│   ├── 01-项目方案/         # 项目方案文档
│   ├── 02-技术文档/         # 技术设计文档
│   └── 03-API文档/          # API接口文档
├── src/                     # 源代码目录
│   ├── frontend/            # 前端项目
│   ├── backend/             # 后端项目
│   ├── database/            # 数据库相关
│   └── ai/                  # AI集成模块
├── config/                  # 配置文件
├── scripts/                 # 脚本工具
├── tests/                   # 测试文件
├── backups/                 # 备份文件
└── data/                    # 数据文件
```

---

## 🚀 快速开始

### 环境要求

- Node.js 18+
- PostgreSQL 15+
- Redis 7+
- Docker 24+
- Docker Compose 2.20+

### 安装步骤

1. 克隆项目
2. 安装依赖
3. 配置环境变量
4. 启动服务

详细步骤请参考 `docs/02-技术文档/01-部署指南.md`

---

## 📚 文档导航

### 项目方案
- [完整实施方案](docs/长篇小说AI助手平台完整实施方案_20260319_终极版.md) - 完整的项目实施方案
- [项目管理深度分析](docs/项目管理深度分析.md) - 项目管理详细分析

### 技术文档
- [技术实现方案](docs/技术实现方案与开发计划.md) - 技术架构和开发计划
- [整体方案](docs/整体方案.md) - 项目整体方案

---

## 🎯 核心功能

### P0级核心功能
1. **设定统一管理系统** - 12大弹性要素,修改一处自动同步
2. **双层知识库系统** - 个人专属知识库 + 单本小说知识库
3. **基础章节生成** - 基于设定自动生成章节内容
4. **数据安全隔离** - 用户数据完全隔离,无社交功能

### P1-P3级扩展功能
1. **智能提醒与矛盾检测** - 设定一致性检查
2. **批量生成功能** - 任务队列,进度跟踪
3. **可视化图谱** - 人物关系、势力层级、感情线
4. **导出备份功能** - 多格式导出,自动备份

---

## 🔧 技术栈

### 前端
- React 18 + Next.js 14
- TypeScript 5.0+
- Tailwind CSS + shadcn/ui
- D3.js / React Flow (可视化)
- Zustand (状态管理)

### 后端
- Node.js + NestJS + TypeScript
- PostgreSQL 15 + Redis 7
- Prisma ORM
- BullMQ (任务队列)

### AI集成
- 豆包 API (字节跳动)
- 文心一言 (百度)
- 通义千问 (阿里)
- 智谱清言 (智谱AI)

### 基础设施
- Docker + Docker Compose
- Prometheus + Grafana (监控)
- GitHub Actions (CI/CD)

---

## 📊 项目进度

- **当前阶段**: 全面实施阶段
- **预计周期**: 25-30周
- **MVP完成**: 第10周
- **正式上线**: 第25周

详细进度请参考 `docs/01-项目方案/02-实施路线图.md`

---

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 发起 Pull Request

---

## 📄 许可证

MIT License

---

## 📞 联系方式

如有问题,请查看文档或联系项目维护者。
'@

$readmePath = Join-Path $projectDir "README.md"
$readmeContent | Out-File -FilePath $readmePath -Encoding UTF8
Write-Host "Created: $readmePath"

# 创建开发指南
$devGuideContent = @'
# 开发指南

## 环境配置

### 1. 安装Node.js 18+

下载地址: https://nodejs.org/

验证安装:
```bash
node --version
npm --version
```

### 2. 安装PostgreSQL 15+

下载地址: https://www.postgresql.org/download/

验证安装:
```bash
psql --version
```

### 3. 安装Redis 7+

下载地址: https://redis.io/download/

验证安装:
```bash
redis-cli --version
```

### 4. 安装Docker

下载地址: https://www.docker.com/get-started/

验证安装:
```bash
docker --version
docker-compose --version
```

## 项目结构

```
src/
├── frontend/          # 前端项目
│   ├── src/
│   │   ├── app/      # Next.js 路由页面
│   │   ├── components/ # 组件库
│   │   ├── hooks/    # 自定义 Hooks
│   │   ├── services/ # API 服务
│   │   ├── stores/   # 状态管理
│   │   ├── types/    # TypeScript 类型
│   │   └── utils/    # 工具函数
│   └── package.json
│
├── backend/           # 后端项目
│   ├── src/
│   │   ├── modules/  # 模块
│   │   ├── common/   # 通用
│   │   ├── config/   # 配置
│   │   └── main.ts   # 入口文件
│   ├── prisma/       # Prisma 配置
│   └── package.json
│
└── database/          # 数据库
    ├── migrations/   # 数据库迁移
    └── schema.sql    # 数据库结构
```

## 开发流程

### 1. 克隆项目

```bash
git clone <repository-url>
cd 长篇小说AI助手
```

### 2. 安装依赖

```bash
# 前端
cd src/frontend
npm install

# 后端
cd ../backend
npm install
```

### 3. 配置环境变量

```bash
# 前端
cp .env.example .env
# 编辑 .env 文件

# 后端
cp .env.example .env
# 编辑 .env 文件
```

### 4. 启动开发环境

```bash
# 使用Docker Compose启动所有服务
cd ../../
docker-compose up -d

# 启动前端
cd src/frontend
npm run dev

# 启动后端
cd ../backend
npm run start:dev
```

### 5. 运行测试

```bash
# 前端测试
cd src/frontend
npm test

# 后端测试
cd ../backend
npm run test
```

## 代码规范

### 前端规范

- 使用TypeScript
- 遵循React最佳实践
- 使用ESLint和Prettier
- 组件命名使用PascalCase
- 变量命名使用camelCase

### 后端规范

- 使用TypeScript
- 遵循NestJS最佳实践
- 使用ESLint和Prettier
- 模块命名使用PascalCase
- 控制器命名使用PascalCase
- 服务命名使用PascalCase

## Git工作流

### 分支策略

- `main` - 主分支,稳定版本
- `develop` - 开发分支,集成测试
- `feature/*` - 功能分支
- `bugfix/*` - 修复分支
- `release/*` - 发布分支

### 提交规范

```
feat:     新功能
fix:      修复
docs:     文档
style:    样式
refactor: 重构
test:     测试
chore:    工程化
```

示例:
```
feat: 添加用户管理系统
fix: 修复章节生成bug
docs: 更新API文档
```

## 常见问题

### 1. 端口被占用

修改 `.env` 文件中的端口配置

### 2. 数据库连接失败

检查PostgreSQL服务是否启动
确认连接参数是否正确

### 3. Redis连接失败

检查Redis服务是否启动
确认连接参数是否正确

---

更多详细信息请参考 `docs/` 目录下的文档。
'@

$devGuidePath = Join-Path $projectDir "docs\02-技术文档\01-开发指南.md"
$devGuideContent | Out-File -FilePath $devGuidePath -Encoding UTF8
Write-Host "Created: $devGuidePath"

# 创建技术架构文档
$archContent = @'
# 技术架构文档

## 整体架构

```
┌─────────────────────────────────────────────────────────────┐
│                        前端层 (React + Next.js)               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│  │  小说管理页  │  │  小说创作页  │  │   个人中心页     │ │
│  │  + 可视化组件│  │  + 编辑模块  │  │   + 设置/知识库  │ │
│  └──────────────┘  └──────────────┘  └──────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      后端层 (Node.js + NestJS)                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│  │  用户服务    │  │  小说服务    │  │   AI 集成服务    │ │
│  │  认证/权限   │  │  设定/章节   │  │   上下文/生成     │ │
│  └──────────────┘  └──────────────┘  └──────────────────┘ │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│  │  知识库服务  │  │  任务队列    │  │   管理后台服务   │ │
│  │  检索/关联   │  │  批量生成    │  │   用户/内容管理   │ │
│  └──────────────┘  └──────────────┘  └──────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      数据层                                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│  │ PostgreSQL   │  │    Redis     │  │  对象存储 (OSS)  │ │
│  │  业务数据    │  │  缓存/限流   │  │  附件/备份        │ │
│  └──────────────┘  └──────────────┘  └──────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      AI 服务层 (多模型集成)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│  │  豆包 API    │  │  文心一言    │  │   通义千问       │ │
│  │  文本生成    │  │  文本润色    │  │   智谱清言       │ │
│  └──────────────┘  └──────────────┘  └──────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 技术栈详情

### 前端技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18+ | UI框架 |
| Next.js | 14+ | SSR框架 |
| TypeScript | 5.0+ | 类型系统 |
| Tailwind CSS | 3.3+ | 样式框架 |
| shadcn/ui | 0.4+ | UI组件库 |
| D3.js/React Flow | 7.8+/11.7+ | 数据可视化 |
| Zustand | 4.4+ | 状态管理 |
| Vite | 5.0+ | 构建工具 |

### 后端技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Node.js | 18+ | 运行环境 |
| NestJS | 10.0+ | 框架 |
| TypeScript | 5.0+ | 类型系统 |
| PostgreSQL | 15+ | 关系型数据库 |
| Redis | 7+ | 缓存/队列 |
| Prisma | 5.0+ | ORM |
| BullMQ | 5.0+ | 任务队列 |
| JWT | 9.0+ | 认证 |

### AI集成

| AI服务 | 适用场景 | 配置要求 |
|--------|----------|----------|
| 豆包 API | 大纲/细纲生成、人物设定 | API_KEY、API_URL、MODEL |
| 文心一言 | 世界观生成、专业设定 | API_KEY、API_URL、MODEL |
| 通义千问 | 章节生成、批量润色 | API_KEY、API_URL、MODEL |
| 智谱清言 | 情节设计、细节补充 | API_KEY、API_URL、MODEL |

### 基础设施

| 技术 | 版本 | 用途 |
|------|------|------|
| Docker | 24+ | 容器化 |
| Docker Compose | 2.20+ | 编排 |
| Prometheus | 2.45+ | 监控 |
| Grafana | 10.0+ | 可视化 |
| GitHub Actions | - | CI/CD |

## 目录结构

```
novel-ai-platform/
├── frontend/                    # 前端项目
│   ├── src/
│   │   ├── app/                # Next.js 路由页面
│   │   │   ├── layout.tsx      # 全局布局
│   │   │   ├── page.tsx        # 首页
│   │   │   ├── novels/         # 小说管理页面
│   │   │   │   ├── page.tsx    # 小说列表
│   │   │   │   ├── [id]/       # 小说详情
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── writing/  # 创作页面
│   │   │   │   │       └── page.tsx
│   │   │   │   └── new/        # 新建小说
│   │   │   │       └── page.tsx
│   │   │   └── profile/        # 个人中心
│   │   │       ├── page.tsx
│   │   │       └── settings/   # 设置页面
│   │   │           └── page.tsx
│   │   ├── components/         # 组件库
│   │   │   ├── novel/          # 小说相关组件
│   │   │   │   ├── setting-editor/  # 设定编辑器
│   │   │   │   ├── chapter-editor/  # 章节编辑器
│   │   │   │   └── visualization/   # 可视化组件
│   │   │   ├── ui/             # 通用UI组件
│   │   │   │   ├── button.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   └── ...
│   │   │   └── common/         # 通用组件
│   │   ├── hooks/              # 自定义 Hooks
│   │   │   ├── useSettings.ts
│   │   │   ├── useKnowledgeBase.ts
│   │   │   └── useAI.ts
│   │   ├── services/           # API 服务
│   │   │   ├── api.ts          # 基础API调用
│   │   │   ├── novel.ts        # 小说相关API
│   │   │   └── ai.ts           # AI相关API
│   │   ├── stores/             # Zustand 状态管理
│   │   │   ├── settings.ts
│   │   │   ├── chapters.ts
│   │   │   └── user.ts
│   │   ├── types/              # TypeScript 类型
│   │   │   ├── setting.ts
│   │   │   ├── chapter.ts
│   │   │   └── user.ts
│   │   └── utils/              # 工具函数
│   │       ├── format.ts
│   │       ├── validation.ts
│   │       └── ai.ts
│   │
│   ├── public/                 # 静态资源
│   │   ├── favicon.ico
│   │   └── logo.png
│   │
│   ├── styles/                 # 全局样式
│   │   └── globals.css
│   │
│   ├── next.config.js          # Next.js 配置
│   ├── tailwind.config.js      # Tailwind 配置
│   └── package.json
│
├── backend/                     # 后端项目
│   ├── src/
│   │   ├── modules/            # 模块
│   │   │   ├── user/           # 用户模块
│   │   │   │   ├── user.controller.ts
│   │   │   │   ├── user.service.ts
│   │   │   │   ├── user.entity.ts
│   │   │   │   └── user.module.ts
│   │   │   ├── novel/          # 小说模块
│   │   │   │   ├── novel.controller.ts
│   │   │   │   ├── novel.service.ts
│   │   │   │   ├── novel.entity.ts
│   │   │   │   └── novel.module.ts
│   │   │   ├── setting/        # 设定模块
│   │   │   │   ├── setting.controller.ts
│   │   │   │   ├── setting.service.ts
│   │   │   │   ├── setting.entity.ts
│   │   │   │   └── setting.module.ts
│   │   │   ├── chapter/        # 章节模块
│   │   │   │   ├── chapter.controller.ts
│   │   │   │   ├── chapter.service.ts
│   │   │   │   ├── chapter.entity.ts
│   │   │   │   └── chapter.module.ts
│   │   │   ├── knowledge/      # 知识库模块
│   │   │   │   ├── knowledge.controller.ts
│   │   │   │   ├── knowledge.service.ts
│   │   │   │   └── knowledge.module.ts
│   │   │   ├── ai/             # AI 集成模块
│   │   │   │   ├── ai.controller.ts
│   │   │   │   ├── ai.service.ts
│   │   │   │   ├── ai.provider.ts
│   │   │   │   └── ai.module.ts
│   │   │   ├── queue/          # 任务队列模块
│   │   │   │   ├── queue.controller.ts
│   │   │   │   ├── queue.service.ts
│   │   │   │   └── queue.module.ts
│   │   │   └── admin/          # 管理后台模块
│   │   │       ├── admin.controller.ts
│   │   │       ├── admin.service.ts
│   │   │       └── admin.module.ts
│   │   │
│   │   ├── common/             # 通用
│   │   │   ├── decorators/     # 装饰器
│   │   │   │   ├── roles.decorator.ts
│   │   │   │   └── ...
│   │   │   ├── guards/         # 守卫
│   │   │   │   ├── roles.guard.ts
│   │   │   │   └── ...
│   │   │   ├── interceptors/   # 拦截器
│   │   │   │   ├── logging.interceptor.ts
│   │   │   │   └── ...
│   │   │   └── filters/        # 异常过滤器
│   │   │       └── ...
│   │   │
│   │   ├── config/             # 配置
│   │   │   ├── database.config.ts
│   │   │   ├── ai.config.ts
│   │   │   └── app.config.ts
│   │   │
│   │   └── main.ts             # 入口文件
│   │
│   ├── prisma/                 # Prisma 配置
│   │   ├── schema.prisma       # 数据库模型
│   │   └── migrations/         # 数据库迁移
│   │
│   ├── test/                   # 测试
│   │   ├── app.e2e-spec.ts
│   │   └── jest-e2e.json
│   │
│   ├── docker/                 # Docker 配置
│   │   └── Dockerfile
│   │
│   └── package.json
│
├── database/                    # 数据库
│   ├── migrations/              # 数据库迁移
│   ├── seeds/                   # 种子数据
│   └── schema.sql
│
├── docker/                      # Docker 配置
│   ├── docker-compose.yml       # Docker Compose 配置
│   ├── frontend/Dockerfile      # 前端Dockerfile
│   └── backend/Dockerfile       # 后端Dockerfile
│
├── scripts/                     # 脚本工具
│   ├── deploy.sh                # 部署脚本
│   └── backup.sh                # 备份脚本
│
├── tests/                       # 测试
│   ├── unit/                    # 单元测试
│   └── e2e/                     # 端到端测试
│
├── config/                      # 配置文件
│   ├── config.json              # 配置文件
│   └── .env.example             # 环境变量示例
│
├── backups/                     # 备份
│   └── README.md                # 备份说明
│
├── data/                        # 数据
│   ├── seeds/                   # 种子数据
│   └── migrations/              # 数据迁移
│
└── README.md                    # 项目说明
'@

$archPath = Join-Path $projectDir "docs\02-技术文档\02-技术架构.md"
$archContent | Out-File -FilePath $archPath -Encoding UTF8
Write-Host "Created: $archPath"

Write-Host "`n项目结构和基础文档创建完成!"
Write-Host "项目目录: $projectDir"
'@

$scriptPath = Join-Path $projectDir "scripts\setup.ps1"
$scriptContent | Out-File -FilePath $scriptPath -Encoding UTF8
Write-Host "Created: $scriptPath"

Write-Host "`n✅ 项目结构和基础文档创建完成!"
Write-Host "📁 项目目录: $projectDir"
Write-Host "`n📋 创建的目录:"
foreach ($dir in $directories) {
    Write-Host "  - $dir"
}
Write-Host "`n📄 创建的文档:"
Write-Host "  - README.md"
Write-Host "  - docs/02-技术文档/01-开发指南.md"
Write-Host "  - docs/02-技术文档/02-技术架构.md"
Write-Host "  - scripts/setup.ps1"
