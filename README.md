# Counter App - 极简全栈动态网站

一个完整体验「开发 - 数据交互 - 云端部署」全流程的极简计数器应用。

## 📁 项目目录结构

```
counter-app/
├── app/                          # Next.js App Router 目录
│   ├── api/                      # API 路由（后端接口）
│   │   └── counter/
│   │       └── route.ts          # GET / 读取 · POST / 更新 数字
│   ├── admin/
│   │   └── page.tsx              # /admin 后台管理页
│   ├── globals.css               # 全局样式（Tailwind 入口）
│   ├── layout.tsx                # 根布局
│   └── page.tsx                  # / 首页（展示数字）
├── components/                   # 可复用组件（预留目录）
├── data/
│   └── counter.json              # 本地 JSON 数据库（初始值 1）
├── lib/
│   └── counter-store.ts          # 数据访问层（封装读写逻辑）
├── public/                       # 静态资源（预留目录）
├── .gitignore
├── next.config.js                # Next.js 配置
├── next-env.d.ts                 # Next.js 类型声明
├── package.json                  # 依赖与脚本
├── postcss.config.js             # PostCSS 配置
├── tailwind.config.ts            # Tailwind CSS 配置
└── tsconfig.json                 # TypeScript 配置
```

## 🛠 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 框架 | **Next.js 14 (App Router)** + TypeScript | 全栈 React 框架 |
| 样式 | **Tailwind CSS** | 原子化 CSS |
| 后端 | **Next.js API Routes** | 同项目内的 API |
| 数据库 | **本地 JSON 文件** | 零配置体验，可平滑替换为 Supabase |

## 🚀 本地启动

### 前置要求
- Node.js ≥ 18.17
- npm / yarn / pnpm

### 步骤

```bash
# 1. 进入项目目录
cd counter-app

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
```

打开浏览器访问：
- **首页**：http://localhost:3000  →  显示当前数字
- **管理页**：http://localhost:3000/admin  →  修改数字

### 其他命令

```bash
npm run build     # 生产构建
npm run start     # 以生产模式运行
```

## 🔄 API 接口

### GET `/api/counter`
读取当前数字

**响应：**
```json
{ "value": 1 }
```

### POST `/api/counter`
更新数字

**请求体：**
```json
{ "value": 42 }
```

**响应：**
```json
{ "value": 42, "success": true }
```

## 🔌 数据交互流程

```
首页 (page.tsx)
    ↓ fetch GET
/api/counter (route.ts)
    ↓ 调用
lib/counter-store.ts
    ↓ 读写
data/counter.json (数据库)

管理页 (admin/page.tsx)
    ↓ fetch POST
/api/counter (route.ts)
    ↓ 调用
lib/counter-store.ts
    ↓ 写入
data/counter.json (数据库)
```

## ☁️ 部署到云端（推荐 Vercel）

### 方式一：Vercel 一键部署（最简单）
1. 将项目推送到 GitHub
2. 登录 [vercel.com](https://vercel.com)
3. 点击 *New Project* → 选择你的仓库
4. 保持默认设置 → 点击 *Deploy*

⚠️ **注意**：Vercel 是无服务器环境，本地文件（`data/counter.json`）会在每次部署后重置。**生产环境必须替换为真正的数据库**。

### 方式二：替换为 Supabase（生产级）

1. 注册 [Supabase](https://supabase.com)，创建项目
2. 在 SQL Editor 中执行：
   ```sql
   create table counter (
     id serial primary key,
     value int not null default 1
   );
   insert into counter (value) values (1);
   ```
3. 安装 Supabase SDK：
   ```bash
   npm install @supabase/supabase-js
   ```
4. 创建 `.env.local`：
   ```
   NEXT_PUBLIC_SUPABASE_URL=你的项目URL
   SUPABASE_SERVICE_ROLE_KEY=你的service_role_key
   ```
5. 替换 `lib/counter-store.ts` 中的读写逻辑为 Supabase 调用（函数签名不变，只换实现）

## 📝 学习要点

这个项目虽小，但覆盖了完整的全栈闭环：

1. **前端渲染** - Next.js App Router + 客户端组件 (`"use client"`)
2. **API 设计** - RESTful 风格的 GET/POST
3. **数据层封装** - `counter-store.ts` 隔离存储实现，方便替换
4. **前后端交互** - fetch API 调用
5. **用户反馈** - Toast 提示
6. **响应式布局** - Tailwind CSS

---

有任何问题随时问我，也可以帮你扩展功能（加加减按钮、历史记录、多用户等）。
