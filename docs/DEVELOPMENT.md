# 开发指南

## 环境要求

- Node.js 20+
- pnpm 10+
- Docker & Docker Compose
- PostgreSQL 15+
- Redis 7+

## 本地开发

### 1. 启动数据库

```bash
docker compose up -d
```

### 2. 安装依赖

```bash
# 后端
cd backend
pnpm install
npx prisma generate

# 前端
cd ../frontend
pnpm install
```

### 3. 配置环境变量

后端 `.env`:
```env
DATABASE_URL="postgresql://novel_ai:novel_ai_password@localhost:5433/novel_ai_db?schema=public"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"
PORT=3002
```

前端 `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3002/api/v1
```

### 4. 运行数据库迁移

```bash
cd backend
npx prisma migrate dev
```

### 5. 启动服务

```bash
# 后端
cd backend
pnpm start:dev

# 前端 (新终端)
cd frontend
pnpm dev
```

## 代码规范

### 提交规范

```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式
refactor: 重构
test: 测试
chore: 构建/工具
```

### 分支管理

- `main` - 主分支，稳定版本
- `develop` - 开发分支
- `feature/*` - 功能分支
- `hotfix/*` - 紧急修复

## API 开发

### 创建新模块

1. 创建模块目录:
```bash
cd backend/src/modules
mkdir -p new-module/dto
```

2. 创建文件:
- `dto/new-module.dto.ts` - 数据传输对象
- `new-module.service.ts` - 业务逻辑
- `new-module.controller.ts` - 路由控制器
- `new-module.module.ts` - 模块定义

3. 注册模块:
```typescript
// app.module.ts
import { NewModuleModule } from './modules/new-module/new-module.module';

@Module({
  imports: [
    // ...
    NewModuleModule,
  ],
})
export class AppModule {}
```

## 前端开发

### 创建新页面

```bash
cd frontend/src/app
mkdir new-page
touch new-page/page.tsx
```

### 创建新组件

```bash
cd frontend/src/components
mkdir new-component
touch new-component/NewComponent.tsx
```

## 测试

### 后端测试

```bash
cd backend
pnpm test
```

### 前端测试

```bash
cd frontend
pnpm test
```

## 部署

### Docker 部署

```bash
docker compose -f docker-compose.prod.yml up -d
```

### 手动部署

1. 构建前端:
```bash
cd frontend
pnpm build
```

2. 构建后端:
```bash
cd backend
pnpm build
```

3. 使用 PM2 管理:
```bash
pm2 start backend/dist/main.js --name novel-ai-backend
```
