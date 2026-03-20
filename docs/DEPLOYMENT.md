# 部署指南

## 环境准备

### 服务器要求
- CPU: 2核+
- 内存: 4GB+
- 存储: 20GB+
- 操作系统: Ubuntu 20.04+ / CentOS 8+

### 软件要求
- Docker 20.10+
- Docker Compose 2.0+
- Node.js 20+ (可选，用于手动部署)

## Docker 部署 (推荐)

### 1. 克隆代码

```bash
git clone https://github.com/amwlk/novel-ai-assistant.git
cd novel-ai-assistant
```

### 2. 配置环境变量

创建 `backend/.env`:
```env
DATABASE_URL="postgresql://novel_ai:your_password@postgres:5432/novel_ai_db?schema=public"
REDIS_URL="redis://redis:6379"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
PORT=3002

# AI API Keys (可选)
DOUBAO_API_KEY="your-doubao-key"
ERNIE_API_KEY="your-ernie-key"
QWEN_API_KEY="your-qwen-key"
ZHIPU_API_KEY="your-zhipu-key"
```

创建 `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://your-domain:3002/api/v1
```

### 3. 启动服务

```bash
docker compose -f docker-compose.prod.yml up -d
```

### 4. 初始化数据库

```bash
docker compose exec backend npx prisma migrate deploy
```

## 手动部署

### 1. 安装依赖

```bash
# 后端
cd backend
pnpm install
npx prisma generate

# 前端
cd ../frontend
pnpm install
```

### 2. 构建项目

```bash
# 后端
cd backend
pnpm build

# 前端
cd ../frontend
pnpm build
```

### 3. 使用 PM2 管理

后端 `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'novel-ai-backend',
    script: 'dist/main.js',
    cwd: '/path/to/backend',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3002
    }
  }]
}
```

启动:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

前端使用 Nginx 反向代理。

## Nginx 配置

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 前端
    location / {
        root /path/to/frontend/out;
        try_files $uri $uri.html $uri/ =404;
    }

    # 后端 API
    location /api/ {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## HTTPS 配置

使用 Let's Encrypt:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 数据库备份

### PostgreSQL 备份

```bash
# 手动备份
docker compose exec postgres pg_dump -U novel_ai novel_ai_db > backup.sql

# 自动备份 (crontab)
0 2 * * * docker compose exec -T postgres pg_dump -U novel_ai novel_ai_db > /backup/db_$(date +\%Y\%m\%d).sql
```

### Redis 备份

```bash
docker compose exec redis redis-cli BGSAVE
docker compose cp redis:/data/dump.rdb /backup/redis_$(date +\%Y\%m\%d).rdb
```

## 监控

### 日志

```bash
# 查看后端日志
docker compose logs -f backend

# 查看 Nginx 日志
tail -f /var/log/nginx/access.log
```

### 健康检查

```bash
# 后端健康检查
curl http://localhost:3002/api/v1/health

# 数据库连接检查
docker compose exec postgres pg_isready
```

## 更新部署

```bash
# 拉取最新代码
git pull origin main

# 重新构建并部署
docker compose down
docker compose -f docker-compose.prod.yml up -d --build

# 运行数据库迁移
docker compose exec backend npx prisma migrate deploy
```

## 故障排查

### 后端无法启动

1. 检查环境变量是否正确
2. 检查数据库连接
3. 查看日志: `docker compose logs backend`

### 前端无法访问

1. 检查 Nginx 配置
2. 检查前端构建是否成功
3. 检查端口是否被占用

### 数据库连接失败

1. 检查 PostgreSQL 是否运行
2. 检查连接字符串是否正确
3. 检查网络连接
