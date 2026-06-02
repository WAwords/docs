# React 常用技巧

本文档整理 React 开发过程中常用的高效技巧与最佳实践，配合 [React Hooks 常用指南](./react-hooks) 一起使用效果更佳。

## 组件设计

### 函数组件代替类组件

```tsx
// 推荐：使用函数组件 + Hooks
function Welcome({ name }: { name: string }) {
  return <h1>你好，{name}</h1>;
}
```

### 组件拆分原则

```tsx
// 将大型组件拆分为多个小组件，提升可维护性
function UserList({ users }: { users: User[] }) {
  return (
    <ul>
      {users.map(user => (
        <ListItem key={user.id} user={user} />
      ))}
    </ul>
  );
}

// 单个列表项抽离为独立组件
function ListItem({ user }: { user: User }) {
  return <li>{user.name}</li>;
}
```

## Props 传值

### 默认值与可选参数

```tsx
import { useState } from 'react';

interface ButtonProps {
  // 必填参数
  label: string;
  // 可选参数
  size?: 'small' | 'medium' | 'large';
  // 带默认值的可选参数
  disabled?: boolean;
}

function Button({ label, size = 'medium', disabled = false }: ButtonProps) {
  return (
    <button disabled={disabled} className={`btn-${size}`}>
      {label}
    </button>
  );
}
```

### children 插槽

```tsx
import type { ReactNode } from 'react';

interface CardProps {
  title: string;
  children: ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="card-body">{children}</div>
    </div>
  );
}

// 使用方式
<Card title="提示">
  <p>这里是卡片内容</p>
</Card>
```

## 条件渲染

### 三种常用写法

```tsx
function Greeting({ isLogin, userName }: Props) {
  // 写法一：三元运算符
  return isLogin ? <p>欢迎，{userName}</p> : <p>请登录</p>;
}

function Notice({ count }: { count: number }) {
  // 写法二：与运算符短路
  return count > 0 && <p>您有 {count} 条未读消息</p>;
}

function Page({ loading, data }: PageProps) {
  // 写法三：立即执行函数（适合复杂条件）
  if (loading) return <div>加载中...</div>;
  if (!data) return <div>暂无数据</div>;
  return <div>{data.title}</div>;
}
```

## 列表渲染

### key 属性的正确使用

```tsx
function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul>
      {todos.map(todo => (
        // 使用稳定的唯一标识作为 key，避免使用 index
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

## 性能优化

### React.memo 记忆化组件

```tsx
import { memo } from 'react';

interface ItemProps {
  name: string;
}

// 使用 memo 包装，只有 props 变化时才重新渲染
const ListItem = memo(function ListItem({ name }: ItemProps) {
  console.log('渲染：', name);
  return <li>{name}</li>;
});
```

### useCallback 缓存函数

```tsx
import { useCallback, useState } from 'react';

function Parent() {
  const [count, setCount] = useState(0);

  // 缓存回调函数，避免子组件不必要重渲染
  const handleClick = useCallback(() => {
    console.log('点击事件');
  }, []);

  return <Child onClick={handleClick} />;
}
```

### useMemo 缓存计算结果

```tsx
import { useMemo, useState } from 'react';

function ExpensiveList({ items }: { items: number[] }) {
  const [filter, setFilter] = useState('');

  // 仅在 items 或 filter 变化时重新计算
  const filteredItems = useMemo(() => {
    console.log('执行过滤计算');
    return items.filter(item => item.toString().includes(filter));
  }, [items, filter]);

  return (
    <div>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      {filteredItems.map(item => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}
```

## 状态管理

### 状态提升

```tsx
// 将共享状态提升到最近的公共父组件
function TemperatureApp() {
  // 温度值与单位状态由父组件统一管理
  const [temperature, setTemperature] = useState('');
  const [scale, setScale] = useState<'c' | 'f'>('c');

  return (
    <div>
      <TemperatureInput
        scale="c"
        temperature={temperature}
        onTemperatureChange={setTemperature}
      />
      <TemperatureInput
        scale="f"
        temperature={temperature}
        onTemperatureChange={setTemperature}
      />
    </div>
  );
}
```

## 表单处理

### 受控组件

```tsx
import { useState, ChangeEvent } from 'react';

function LoginForm() {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('提交：', form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" value={form.username} onChange={handleChange} />
      <input name="password" type="password" value={form.password} onChange={handleChange} />
      <button type="submit">登录</button>
    </form>
  );
}
```

## 常见陷阱

### 不要在循环或条件中调用 Hook

```tsx
// 错误示例
function Bad({ count }: { count: number }) {
  if (count > 0) {
    // 错误：条件调用 Hook，可能导致状态错乱
    const [value, setValue] = useState(0);
  }
  return <div>{count}</div>;
}

// 正确示例
function Good({ count }: { count: number }) {
  // 始终在顶层调用 Hook
  const [value, setValue] = useState(0);
  if (count > 0) {
    return <div>{count}</div>;
  }
  return <div>{value}</div>;
}
```

### 避免无用 setState

```tsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // 推荐：使用函数式更新，避免依赖外部状态
    setCount(prev => prev + 1);
  };

  return <button onClick={handleClick}>点击 {count} 次</button>;
}
```

## 工具推荐

- **React DevTools**：浏览器插件，用于调试组件树与状态。
- **ESLint 插件**：`eslint-plugin-react-hooks`，自动检查 Hooks 使用规范。
- **VSCode 插件**：`ES7+ React/Redux/React-Native snippets`，快速生成组件代码片段。
