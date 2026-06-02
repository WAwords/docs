# React Hooks 常用指南

本文档整理 React Hooks 的常用用法与最佳实践，帮助开发者提升 React 开发效率。

## useState

### 基本用法

```tsx
import { useState } from 'react';

function Counter() {
  // 声明状态变量 count，初始值为 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
}
```

### 函数式更新

```tsx
// 使用前一个状态值进行更新
setCount(prevCount => prevCount + 1);
```

### 对象或数组状态

```tsx
function UserForm() {
  const [user, setUser] = useState({ name: '', age: 0 });

  const updateUser = (field: string, value: any) => {
    // 使用展开运算符保留其他属性
    setUser(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <input
        type="text"
        value={user.name}
        onChange={e => updateUser('name', e.target.value)}
        placeholder="姓名"
      />
      <input
        type="number"
        value={user.age}
        onChange={e => updateUser('age', Number(e.target.value))}
        placeholder="年龄"
      />
    </div>
  );
}
```

## useEffect

### 基本用法

```tsx
import { useEffect, useState } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // 组件挂载时执行
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // 清理函数，组件卸载时执行
    return () => clearInterval(interval);
  }, []); // 空依赖数组表示只在挂载和卸载时执行

  return <div>计时: {seconds} 秒</div>;
}
```

### 依赖数组

```tsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 当 userId 变化时重新获取数据
    fetchUser(userId).then(data => setUser(data));
  }, [userId]); // 依赖 userId

  if (!user) return <div>加载中...</div>;
  return <div>用户名: {user.name}</div>;
}
```

### 多个 useEffect

```tsx
function Component() {
  // 处理订阅
  useEffect(() => {
    const subscription = subscribe();
    return () => subscription.unsubscribe();
  }, []);

  // 处理文档标题
  useEffect(() => {
    document.title = '新标题';
  }, []);

  return <div>内容</div>;
}
```

## useContext

### 创建和使用 Context

```tsx
import { createContext, useContext, useState } from 'react';

// 创建 Context
const ThemeContext = createContext('light');

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  // 使用 Context
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      切换主题
    </button>
  );
}

// 使用
function App() {
  return (
    <ThemeProvider>
      <ThemedButton />
    </ThemeProvider>
  );
}
```

## useReducer

### 基本用法

```tsx
import { useReducer } from 'react';

// 定义 reducer 函数
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>计数: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>重置</button>
    </div>
  );
}
```

## useCallback

### 基本用法

```tsx
import { useCallback, useState } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // 使用 useCallback 缓存函数，避免不必要的重新渲染
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []); // 空依赖数组，函数只创建一次

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <ChildComponent onClick={handleClick} />
      <p>计数: {count}</p>
    </div>
  );
}

function ChildComponent({ onClick }) {
  console.log('ChildComponent 重新渲染');
  return <button onClick={onClick}>增加</button>;
}
```

## useMemo

### 基本用法

```tsx
import { useMemo, useState } from 'react';

function ExpensiveComponent() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);

  // 使用 useMemo 缓存计算结果
  const expensiveCalculation = useMemo(() => {
    console.log('执行昂贵计算');
    return count * 2;
  }, [count]); // 只在 count 变化时重新计算

  return (
    <div>
      <p>计算结果: {expensiveCalculation}</p>
      <button onClick={() => setCount(c => c + 1)}>增加</button>
      <button onClick={() => setTodos([...todos, '新任务'])}>添加任务</button>
    </div>
  );
}
```

## useRef

### 基本用法

```tsx
import { useRef, useEffect } from 'react';

function TextInputWithFocusButton() {
  const inputRef = useRef(null);

  const handleClick = () => {
    // 访问 DOM 元素
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>聚焦输入框</button>
    </div>
  );
}
```

### 存储可变值

```tsx
import { useRef, useState, useEffect } from 'react';

function Timer() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={stopTimer}>停止</button>
    </div>
  );
}
```

## useImperativeHandle

### 基本用法

```tsx
import { useImperativeHandle, forwardRef, useRef } from 'react';

const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      inputRef.current.value = '';
    }
  }));

  return <input ref={inputRef} />;
});

function Parent() {
  const fancyInputRef = useRef();

  return (
    <div>
      <FancyInput ref={fancyInputRef} />
      <button onClick={() => fancyInputRef.current.focus()}>聚焦</button>
      <button onClick={() => fancyInputRef.current.clear()}>清空</button>
    </div>
  );
}
```

## 自定义 Hook

### 创建自定义 Hook

```tsx
import { useState, useEffect } from 'react';

// 自定义 Hook：获取窗口尺寸
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

// 使用自定义 Hook
function MyComponent() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>窗口宽度: {width}</p>
      <p>窗口高度: {height}</p>
    </div>
  );
}
```

### 数据获取自定义 Hook

```tsx
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// 使用
function UserProfile({ userId }) {
  const { data, loading, error } = useFetch(`/api/users/${userId}`);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error.message}</div>;

  return <div>用户名: {data.name}</div>;
}
```

## Hook 使用规则

::: warning 重要规则
1. 只在 React 函数组件或自定义 Hook 中调用 Hook
2. 只在组件顶层调用 Hook，不要在循环、条件或嵌套函数中调用
:::

## 常见模式

### 状态提升

```tsx
import { useState } from 'react';

function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Child count={count} onIncrement={() => setCount(c => c + 1)} />
      <p>父组件计数: {count}</p>
    </div>
  );
}

function Child({ count, onIncrement }) {
  return <button onClick={onIncrement}>子组件计数: {count}</button>;
}
```

### 组合多个 Hook

```tsx
import { useState, useEffect, useCallback } from 'react';

function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const fetchResults = useCallback(async () => {
    if (!query) return;
    const response = await fetch(`/api/search?q=${query}`);
    const data = await response.json();
    setResults(data);
  }, [query]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(timer);
  }, [query, fetchResults]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="搜索..."
      />
      <ul>
        {results.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
```
