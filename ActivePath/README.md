# ActivePath

一个现代化的健康运动社区平台，帮助用户发现和参与各种体育活动。

## 功能特性

### 🏠 首页
- 展示所有功能模块的概览
- 响应式设计，适配各种设备
- 引导用户注册和登录

### 📋 Program（精选路径）
- 初学者计划
- 包容性运动
- 俱乐部连接

### 🎯 Activities（活动）
- **地图视图**：显示附近的活动和运动场所
- **日历视图**：按日期查看活动安排
- **列表视图**：详细的活动信息展示
- **筛选功能**：按类型、难度、日期筛选
- **社区挑战**：参与各种运动挑战

### 👥 Community（社区）
- 群组功能
- 指导系统
- 参与者真实故事

### 👤 Account（账户）
- 个人资料管理
- 进度跟踪
- 已保存项目
- 通知系统

### 📚 Resources（资源）
- 安全预防指导
- 营养建议
- 健康相关内容

### 🔐 用户认证
- 用户注册（带验证）
- 用户登录（带验证）
- 表单验证使用 Vuelidate

## 技术栈

- **前端框架**：Vue 3 + TypeScript
- **路由管理**：Vue Router 4
- **表单验证**：Vuelidate
- **构建工具**：Vite
- **样式**：CSS3 + 响应式设计

## 响应式设计

- 桌面端：完整功能展示
- 平板端：适配中等屏幕
- 移动端：优化触摸体验，汉堡菜单导航

## 安装和运行

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 构建生产版本：
```bash
npm run build
```

4. 预览生产版本：
```bash
npm run preview
```

## 项目结构

```
src/
├── components/          # 共用组件目录
│   ├── Navigation.vue   # 主导航组件
│   ├── BaseButton.vue   # 基础按钮组件
│   ├── BaseCard.vue     # 基础卡片组件
│   ├── PageHeader.vue   # 页面头部组件
│   └── icons/           # 图标组件
├── views/               # 页面视图目录
│   ├── HomeView.vue     # 首页
│   ├── ActivitiesView.vue  # 活动页面（完整功能）
│   ├── ProgramView.vue     # 程序页面
│   ├── CommunityView.vue   # 社区页面
│   ├── ResourcesView.vue   # 资源页面
│   ├── AccountView.vue     # 账户页面
│   ├── LoginView.vue       # 登录页面
│   ├── RegisterView.vue    # 注册页面
│   └── AboutView.vue       # 关于页面
├── router/             # 路由配置
│   └── index.ts
├── assets/             # 静态资源
├── App.vue             # 主应用组件
└── main.ts             # 应用入口
```

## 组件设计原则

### Views（页面组件）
- 位于 `src/views/` 目录
- 负责页面的整体布局和业务逻辑
- 使用共用组件构建页面
- 处理路由和状态管理

### Components（共用组件）
- 位于 `src/components/` 目录
- 可复用的UI组件
- 遵循单一职责原则
- 支持多种变体和配置

### 共用组件列表
- `BaseButton.vue`：基础按钮组件，支持多种样式和尺寸
- `BaseCard.vue`：基础卡片组件，支持多种变体
- `PageHeader.vue`：页面头部组件，统一的标题样式
- `Navigation.vue`：主导航组件，响应式导航栏

## 开发说明

- 页面组件放在 `src/views/` 目录下
- 共用组件放在 `src/components/` 目录下
- 使用 Vue 3 Composition API 和 TypeScript
- 表单验证使用 Vuelidate 库
- 响应式设计使用 CSS Media Queries
- 导航使用 Vue Router 进行路由管理

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

MIT License

