
# 前端开发最佳实践

本文档总结了前端开发中常见的最佳实践，帮助开发者写出更优雅、可维护的代码。

## 代码组织与结构

### 1. 组件化开发
将 UI 拆分为可复用的组件，每个组件负责单一职责。

```javascript
// Bad
function UserProfile() {
  return (
    &lt;div&gt;
      &lt;div className="avatar"&gt;
        &lt;img src="..." /&gt;
      &lt;/div&gt;
      &lt;div className="info"&gt;
        &lt;h2&gt;用户名&lt;/h2&gt;
        &lt;p&gt;描述&lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
}

// Good
function Avatar({ src, alt }) {
  return &lt;div className="avatar"&gt;&lt;img src={src} alt={alt} /&gt;&lt;/div&gt;;
}

function UserInfo({ name, bio }) {
  return (
    &lt;div className="info"&gt;
      &lt;h2&gt;{name}&lt;/h2&gt;
      &lt;p&gt;{bio}&lt;/p&gt;
    &lt;/div&gt;
  );
}

function UserProfile({ user }) {
  return (
    &lt;div&gt;
      &lt;Avatar src={user.avatar} alt={user.name} /&gt;
      &lt;UserInfo name={user.name} bio={user.bio} /&gt;
    &lt;/div&gt;
  );
}
```

### 2. 目录结构规范
推荐的项目目录结构：

```
src/
├── components/     # 通用组件
├── pages/          # 页面组件
├── hooks/          # 自定义 Hooks
├── utils/          # 工具函数
├── services/       # API 服务
├── styles/         # 全局样式
├── types/          # TypeScript 类型定义
└── constants/      # 常量定义
```

## 性能优化

### 1. 懒加载
使用懒加载减少初始加载体积。

```javascript
// React 组件懒加载
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() =&gt; import('./LazyComponent'));

function App() {
  return (
    &lt;Suspense fallback={&lt;Loading /&gt;}&gt;
      &lt;LazyComponent /&gt;
    &lt;/Suspense&gt;
  );
}

// 图片懒加载
&lt;img
  src="placeholder.jpg"
  data-src="real-image.jpg"
  loading="lazy"
  alt="描述"
/&gt;
```

### 2. 避免不必要的重渲染
使用适当的优化手段避免组件不必要的重渲染。

```javascript
// React: 使用 useMemo 缓存计算结果
const expensiveValue = useMemo(() =&gt; {
  return computeExpensiveValue(a, b);
}, [a, b]);

// 使用 useCallback 缓存函数
const handleClick = useCallback(() =&gt; {
  doSomething(a, b);
}, [a, b]);

// 使用 React.memo 缓存组件
const MemoizedComponent = React.memo(function MyComponent(props) {
  return &lt;div&gt;{props.value}&lt;/div&gt;;
});
```

### 3. 资源优化
- 使用 WebP/AVIF 等现代图片格式
- 压缩静态资源（JS、CSS、图片）
- 使用 CDN 加速资源加载
- 合理设置缓存策略

## 代码质量

### 1. 类型安全
使用 TypeScript 提供类型安全保障。

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
}

function getUser(id: string): Promise&lt;User&gt; {
  return fetch(`/api/users/${id}`).then(res =&gt; res.json());
}
```

### 2. 错误处理
完善的错误处理机制。

```javascript
// 异步错误处理
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('获取数据失败:', error);
    // 显示错误提示
    showErrorToast(error.message);
    // 或者抛出错误让上层处理
    throw error;
  }
}

// 错误边界（React）
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('组件错误:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return &lt;h1&gt;出现错误了&lt;/h1&gt;;
    }
    return this.props.children;
  }
}
```

### 3. 代码规范
- 使用 ESLint 进行代码检查
- 使用 Prettier 统一代码格式
- 遵循团队约定的代码风格
- 写有意义的注释

## 可访问性（a11y）

### 1. 语义化 HTML
使用正确的 HTML 标签。

```html
&lt;!-- Bad --&gt;
&lt;div onclick="handleClick"&gt;点击这里&lt;/div&gt;

&lt;!-- Good --&gt;
&lt;button onClick={handleClick}&gt;点击这里&lt;/button&gt;

&lt;!-- Bad --&gt;
&lt;div class="heading"&gt;标题&lt;/div&gt;

&lt;!-- Good --&gt;
&lt;h1&gt;标题&lt;/h1&gt;
```

### 2. ARIA 属性
为动态内容添加 ARIA 属性。

```html
&lt;div
  role="alert"
  aria-live="polite"
  aria-atomic="true"
&gt;
  提示信息
&lt;/div&gt;
```

## 安全性

### 1. XSS 防护
避免直接渲染用户输入的 HTML。

```javascript
// Bad
dangerouslySetInnerHTML={{ __html: userInput }}

// Good
import DOMPurify from 'dompurify';
const sanitizedHtml = DOMPurify.sanitize(userInput);
&lt;div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} /&gt;
```

### 2. 数据验证
对用户输入进行严格验证。

```javascript
import { z } from 'zod';

const LoginSchema = z.object({
  email: z.string().email('邮箱格式不正确'),
  password: z.string().min(8, '密码至少8位'),
});

function handleSubmit(data) {
  const result = LoginSchema.safeParse(data);
  if (!result.success) {
    // 处理验证错误
    return;
  }
  // 继续处理
}
```

## 测试

### 1. 单元测试
为工具函数和组件编写单元测试。

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () =&gt; {
  it('渲染按钮文本', () =&gt; {
    render(&lt;Button&gt;点击我&lt;/Button&gt;);
    expect(screen.getByText('点击我')).toBeInTheDocument();
  });

  it('点击时触发回调', () =&gt; {
    const handleClick = jest.fn();
    render(&lt;Button onClick={handleClick}&gt;点击我&lt;/Button&gt;);
    fireEvent.click(screen.getByText('点击我'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 2. E2E 测试
使用 Playwright 或 Cypress 进行端到端测试。

```typescript
import { test, expect } from '@playwright/test';

test('登录流程', async ({ page }) =&gt; {
  await page.goto('/login');
  await page.fill('#email', 'test@example.com');
  await page.fill('#password', 'password123');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

## 总结

遵循这些最佳实践可以帮助你：
- 写出更清晰、可维护的代码
- 提升应用性能
- 提高代码质量
- 增强应用安全性
- 改善用户体验

持续学习和实践，不断优化你的开发流程！

