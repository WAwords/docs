# 前端状态管理指南

## 前言

状态管理是前端开发中的核心话题，有效的状态管理可以提高应用的可维护性和用户体验。

---

## 1. 什么是状态

### 状态的定义

状态是应用程序在特定时刻的数据表示，包括用户输入、UI 状态、服务器数据等。

### 状态的分类

```javascript
// #region ======================== 状态分类 // #endregion ======================== End of 状态分类

// 本地组件状态
const [count, setCount] = useState(0);

// 全局应用状态
// 如用户信息、主题设置、语言设置等

// 服务器状态
// 如从 API 获取的数据列表、用户详情等

// URL 状态
// 如路由参数、查询字符串等

// 表单状态
// 如表单输入、验证状态等

// #endregion ======================== End of 状态分类
```

---

## 2. React 内置状态管理

### useState

```javascript
// #region ======================== useState 使用 // #endregion ======================== End of useState 使用

import { useState } from 'react';

function Counter() {
  // 基础使用
  const [count, setCount] = useState(0);

  // 函数式更新
  const increment = () => {
    setCount(prev => prev + 1);
  };

  // 对象状态
  const [user, setUser] = useState({ name: '', age: 0 });

  const updateUser = () => {
    setUser(prev => ({ ...prev, age: prev.age + 1 }));
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

// #endregion ======================== End of useState 使用
```

### useReducer

```javascript
// #region ======================== useReducer 使用 // #endregion ======================== End of useReducer 使用

import { useReducer } from 'react';

// 定义 reducer 函数
function counterReducer(state, action) {
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
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}

// #endregion ======================== End of useReducer 使用
```

### useContext

```javascript
// #region ======================== useContext 使用 // #endregion ======================== End of useContext 使用

import { createContext, useContext, useState } from 'react';

// 创建 Context
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#333' : '#fff' }}
    >
      Toggle Theme
    </button>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ThemedButton />
    </ThemeProvider>
  );
}

// #endregion ======================== End of useContext 使用
```

---

## 3. Redux / Redux Toolkit

### Redux Toolkit 基础

```javascript
// #region ======================== Redux Toolkit 配置 // #endregion ======================== End of Redux Toolkit 配置

// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// 创建 Slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

export default store;

// #endregion ======================== End of Redux Toolkit 配置
```

### 在 React 中使用

```javascript
// #region ======================== React 中使用 Redux // #endregion ======================== End of React 中使用 Redux

import { Provider, useSelector, useDispatch } from 'react-redux';
import store, { increment, decrement, incrementByAmount } from './store';

function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

// #endregion ======================== End of React 中使用 Redux
```

---

## 4. Zustand

### 基础使用

```javascript
// #region ======================== Zustand 使用 // #endregion ======================== End of Zustand 使用

import { create } from 'zustand';

// 创建 store
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

function Counter() {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  const decrement = useStore((state) => state.decrement);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

// #endregion ======================== End of Zustand 使用
```

---

## 5. Vue 3 状态管理

### Pinia

```javascript
// #region ======================== Pinia 使用 // #endregion ======================== End of Pinia 使用

// stores/counter.js
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});

// 在组件中使用
<script setup>
import { useCounterStore } from '@/stores/counter';

const counter = useCounterStore();
</script>

<template>
  <p>Count: {{ counter.count }}</p>
  <p>Double: {{ counter.doubleCount }}</p>
  <button @click="counter.increment">+</button>
</template>

// #endregion ======================== End of Pinia 使用
```

---

## 6. 状态管理选择建议

### 什么时候需要状态管理库

```javascript
// #region ======================== 状态管理选择建议 // #endregion ======================== End of 状态管理选择建议

// 小型应用：使用 React Context + useReducer 或 Vue provide/inject

// 中型应用：Zustand、Pinia、Jotai 等轻量级库

// 大型应用：Redux Toolkit、MobX 等完整解决方案

// 选择原则：
// 1. 状态共享范围
// 2. 应用复杂度
// 3. 团队熟悉度
// 4. 性能要求

// #endregion ======================== End of 状态管理选择建议
```

---

## 7. 最佳实践

### 状态组织原则

```javascript
// #region ======================== 状态组织原则 // #endregion ======================== End of 状态组织原则

// 1. 保持状态尽可能简单
// 2. 避免冗余状态
// 3. 派生状态使用计算属性
// 4. 将状态放在需要它的最低层级
// 5. 使用规范化的数据结构
// 6. 保持状态的可预测性

// #endregion ======================== End of 状态组织原则
```

---

## 8. 总结

- 选择适合项目规模的状态管理方案
- 不要过度使用全局状态
- 保持状态的可预测性和可维护性
- 考虑状态的持久化需求
- 合理使用状态选择器优化性能
