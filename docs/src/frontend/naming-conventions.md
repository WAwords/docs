# 前端代码命名规范

## 概述

良好的命名规范是代码可读性和可维护性的基础。本文介绍前端开发中常用的命名约定。

## 通用原则

- 命名应具有描述性，见名知意
- 使用英文命名，避免拼音或缩写
- 保持命名风格一致
- 避免使用单字母命名（循环计数器除外）

## 变量命名

### 变量命名规范

```javascript
// 使用驼峰命名法（camelCase）
const userName = '张三';
const isActive = true;
const totalCount = 100;

// 布尔值使用 is、has、can、should 前缀
const isLoading = false;
const hasPermission = true;
const canEdit = true;

// 数组使用复数名词或添加 List 后缀
const users = ['Alice', 'Bob'];
const userList = [];
const items = [];

// 常量使用全大写，下划线分隔
const MAX_RETRY_COUNT = 3;
const API_BASE_URL = 'https://api.example.com';
```

### 命名建议

```javascript
// ✓ 好的命名
const firstName = 'John';
const userProfile = {};
const handleClick = () => {};

// ✗ 差的命名
const a = 'John';           // 无意义
const data = {};            // 太模糊
const doSomething = () => {}; // 不够明确
```

## 函数命名

### 动词前缀

| 前缀 | 用途 | 示例 |
|------|------|------|
| get | 获取数据 | getUserInfo |
| set | 设置数据 | setUserName |
| handle | 事件处理 | handleClick |
| fetch | 异步获取 | fetchData |
| update | 更新数据 | updateProfile |
| delete | 删除数据 | deleteItem |
| validate | 验证 | validateForm |
| format | 格式化 | formatDate |
| parse | 解析 | parseJSON |
| serialize | 序列化 | serializeForm |

### 函数命名示例

```javascript
// 事件处理函数
const handleSubmit = (data) => { /* ... */ };
const handleInputChange = (e) => { /* ... */ };
const handleButtonClick = () => { /* ... */ };

// 业务逻辑函数
const getUserList = async () => { /* ... */ };
const validateEmail = (email) => { /* ... */ };
const formatCurrency = (amount) => { /* ... */ };

// 回调函数
const onSuccess = (result) => { /* ... */ };
const onError = (error) => { /* ... */ };
const onComplete = () => { /* ... */ };
```

## 组件命名

### Vue 组件

```vue
<!-- 使用 PascalCase -->
<script setup>
import UserProfile from './UserProfile.vue';
import ProductCard from './ProductCard.vue';
</script>
```

```javascript
// 组件名称使用 PascalCase
export default {
  name: 'UserProfile',
  // ...
};
```

### React 组件

```jsx
// 使用 PascalCase 命名组件
function UserProfile() {
  return <div>用户信息</div>;
}

function ProductCard() {
  return <div>产品卡片</div>;
}

// 组件文件与组件名保持一致
// UserProfile.jsx
// ProductCard.jsx
```

### 组件相关文件命名

```
components/
├── UserProfile/
│   ├── index.vue         # 组件入口
│   ├── UserProfile.vue   # 主组件
│   ├── UserProfile.scss  # 样式文件
│   └── types.ts         # 类型定义
```

## TypeScript 类型命名

```typescript
// 接口使用 PascalCase，可添加 I 前缀或不加
interface User {
  id: number;
  name: string;
}

// 类型别名
type UserId = number | string;
type Callback = () => void;

// 枚举使用 PascalCase，成员使用 PascalCase
enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
  Guest = 'GUEST',
}

// 泛型使用 T、U、K、V 或描述性名称
function getValue<T>(obj: T): T {
  return obj;
}

interface ResponseData<T> {
  data: T;
  status: number;
}
```

## CSS 类名命名

### BEM 命名法

```scss
// Block
.card { }

// Element
.card__title { }
.card__content { }
.card__footer { }

// Modifier
.card--primary { }
.card__title--large { }
```

### 常用类名

```html
<!-- 布局类 -->
<header class="header">header</header>
<main class="main">main</main>
<aside class="sidebar">sidebar</aside>
<footer class="footer">footer</footer>

<!-- 容器类 -->
.container { }
.wrapper { }
.box { }

/* 通用组件 */
.button { }
.button--primary { }
.button--large { }
.input { }
.input--error { }
.card { }
.modal { }
```

### 语义化命名

```scss
// ✓ 好的命名
.navigation { }
.article-content { }
.user-avatar { }
.price-label { }

// ✗ 差的命名
.nav { }           // 太短
.blue-text { }      // 样式相关，不灵活
.big-div { }        // 不语义化
```

## 文件命名

### 前端项目文件

```
src/
├── components/       # 组件目录
├── pages/           # 页面目录
├── hooks/           # 自定义 Hooks
├── utils/           # 工具函数
├── constants/       # 常量
├── types/           # 类型定义
├── assets/          # 静态资源
└── styles/          # 全局样式
```

### 文件命名规范

```bash
# 组件文件使用 PascalCase
UserProfile.vue
ProductCard.jsx

# 工具函数使用 camelCase
formatDate.ts
parseJSON.ts

# 类型定义文件
types.ts
user.types.ts

# 测试文件
user.test.ts
user.spec.ts

# 样式文件
variables.scss
mixins.scss
```

## 数据库字段命名

```typescript
// 数据库字段使用 snake_case
interface DatabaseUser {
  user_id: number;
  user_name: string;
  created_at: Date;
  updated_at: Date;
}

// API 响应可使用 camelCase
interface ApiResponse {
  userId: number;
  userName: string;
  createdAt: string;
}
```

## Git 分支命名

```bash
# 功能分支
feature/user-login
feature/add-payment

# 修复分支
fix/login-bug
fix/memory-leak

# 发布分支
release/v1.0.0
release/v2.1.0

# 热修复分支
hotfix/security-patch
```

## 总结

- **一致性**：整个项目保持相同的命名风格
- **描述性**：命名应该清晰表达意图
- **简洁性**：在保证清晰的前提下保持简洁
- **可读性**：优先考虑阅读体验，而非打字便利
