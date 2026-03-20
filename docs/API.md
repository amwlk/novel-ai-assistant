# API 文档

## 基础信息

- 基础URL: `http://localhost:3002/api/v1`
- 认证方式: Bearer Token (JWT)
- 响应格式: JSON

## 认证接口

### 注册
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "username": "作者名"
}

Response:
{
  "code": 200,
  "message": "注册成功",
  "data": {
    "accessToken": "jwt_token",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "username": "作者名"
    }
  }
}
```

### 登录
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: 同注册
```

### 获取当前用户
```
GET /auth/me
Authorization: Bearer {token}

Response:
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "作者名",
    "avatarUrl": null,
    "isActive": true
  }
}
```

## 小说接口

### 获取小说列表
```
GET /novels?page=1&pageSize=20&status=writing
Authorization: Bearer {token}

Response:
{
  "code": 200,
  "message": "success",
  "data": [...],
  "meta": {
    "total": 10,
    "page": 1,
    "pageSize": 20,
    "totalPages": 1
  }
}
```

### 创建小说
```
POST /novels
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "我的小说",
  "category": "玄幻",
  "penName": "笔名"
}

Response:
{
  "code": 200,
  "message": "创建成功",
  "data": { ... }
}
```

### 获取小说详情
```
GET /novels/:id
Authorization: Bearer {token}

Response:
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "uuid",
    "title": "我的小说",
    "category": "玄幻",
    "status": "draft",
    "totalChapters": 0,
    "totalWords": 0,
    "settings": [...],
    "chapters": [...],
    "outlines": [...]
  }
}
```

### 更新小说
```
PUT /novels/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "新标题",
  "category": "仙侠"
}
```

### 删除小说
```
DELETE /novels/:id
Authorization: Bearer {token}

Response:
{
  "code": 200,
  "message": "success",
  "data": { "message": "删除成功" }
}
```

## 设定接口

### 获取设定列表
```
GET /settings?novelId={id}&type=CHARACTER&page=1&pageSize=20
Authorization: Bearer {token}
```

### 创建设定
```
POST /settings
Authorization: Bearer {token}
Content-Type: application/json

{
  "novelId": "uuid",
  "type": "CHARACTER",
  "name": "主角",
  "content": "主角设定内容...",
  "tags": ["主角", "男性"]
}
```

### 更新设定
```
PUT /settings/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "content": "更新后的内容",
  "tags": ["主角", "男性", "成长"]
}
```

### 删除设定
```
DELETE /settings/:id
Authorization: Bearer {token}
```

## 章节接口

### 获取章节列表
```
GET /chapters?novelId={id}&page=1&pageSize=20
Authorization: Bearer {token}
```

### 创建章节
```
POST /chapters
Authorization: Bearer {token}
Content-Type: application/json

{
  "novelId": "uuid",
  "chapterNumber": 1,
  "title": "第一章",
  "content": "章节内容..."
}
```

### 更新章节
```
PUT /chapters/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "新标题",
  "content": "更新后的内容"
}
```

### 发布章节
```
PUT /chapters/:id/publish
Authorization: Bearer {token}
```

### 删除章节
```
DELETE /chapters/:id
Authorization: Bearer {token}
```

## AI 接口

### 生成文本
```
POST /ai/generate
Authorization: Bearer {token}
Content-Type: application/json

{
  "novelId": "uuid",
  "prompt": "生成一个玄幻小说的开头",
  "model": "doubao",
  "temperature": 0.7,
  "maxTokens": 3000
}

Response:
{
  "code": 200,
  "message": "success",
  "data": {
    "content": "生成的内容...",
    "model": "doubao",
    "wordCount": 500
  }
}
```

### 润色文本
```
POST /ai/polish
Authorization: Bearer {token}
Content-Type: application/json

{
  "text": "需要润色的文本...",
  "removeAI": true,
  "unifyStyle": true
}

Response:
{
  "code": 200,
  "message": "success",
  "data": {
    "original": "原文...",
    "polished": "润色后的文本...",
    "wordCount": 500
  }
}
```

### 续写故事
```
POST /ai/continue
Authorization: Bearer {token}
Content-Type: application/json

{
  "chapterId": "uuid",
  "prompt": "接下来可能发生...",
  "suggestions": 3
}

Response:
{
  "code": 200,
  "message": "success",
  "data": {
    "suggestions": ["续写建议1", "续写建议2", "续写建议3"],
    "chapterId": "uuid"
  }
}
```

## 知识库接口

### 创建知识条目
```
POST /knowledge
Authorization: Bearer {token}
Content-Type: application/json

{
  "novelId": "uuid",
  "type": "NOVEL_SETTING",
  "content": "知识内容...",
  "tags": ["设定", "人物"]
}
```

### 搜索知识库
```
POST /knowledge/search
Authorization: Bearer {token}
Content-Type: application/json

{
  "query": "主角设定",
  "novelId": "uuid",
  "limit": 10
}
```

## 错误响应

```json
{
  "code": 400,
  "message": "错误信息",
  "data": null
}
```

常见错误码:
- 400: 请求参数错误
- 401: 未授权
- 403: 无权限
- 404: 资源不存在
- 500: 服务器错误
