# 浏览器事件循环

## 概念解析

### 什么是事件循环

事件循环是浏览器用于协调 JavaScript 单线程执行和异步任务调度的机制。它不断从任务队列中取出任务执行，确保 JavaScript 能够非阻塞地处理用户交互、网络请求等操作。

### 为什么需要事件循环

JavaScript 是单线程语言，同一时间只能执行一个任务。事件循环使得 JavaScript 能够在执行耗时操作时不阻塞用户界面，实现异步编程。

## 执行机制

### 任务队列与微任务队列

```javascript
console.log('1 - 同步任务')

setTimeout(() => {
  console.log('2 - setTimeout (宏任务)')
}, 0)

Promise.resolve()
  .then(() => {
    console.log('3 - Promise.then (微任务)')
  })

console.log('4 - 同步任务')

// 输出顺序: 1 -> 4 -> 3 -> 2
```

### 执行顺序规则

1. 执行完所有同步任务
2. 执行所有微任务（Promise 回调、MutationObserver 等）
3. 执行一个宏任务（setTimeout、setInterval、I/O 等）
4. 重复步骤 2-3

## 宏任务与微任务

### 宏任务（Macro Task）

- setTimeout
- setInterval
- I/O 操作
- UI 渲染
- requestAnimationFrame

```javascript
console.log('宏任务开始')

setTimeout(() => {
  console.log('setTimeout 执行')
}, 0)

requestAnimationFrame(() => {
  console.log('requestAnimationFrame 执行')
})

console.log('宏任务结束')
```

### 微任务（Micro Task）

- Promise.then/catch/finally
- MutationObserver
- queueMicrotask

```javascript
Promise.resolve()
  .then(() => {
    console.log('微任务 1')
  })
  .then(() => {
    console.log('微任务 2')
  })

queueMicrotask(() => {
  console.log('queueMicrotask 执行')
})
```

## 经典面试题解析

### 题目一

```javascript
console.log('1')

setTimeout(() => {
  console.log('2')
  new Promise(resolve => {
    console.log('3')
    resolve()
  }).then(() => {
    console.log('4')
  })
})

new Promise(resolve => {
  console.log('5')
  resolve()
}).then(() => {
  console.log('6')
})

setTimeout(() => {
  console.log('7')
}, 0)

console.log('8')

// 输出: 1 -> 5 -> 8 -> 6 -> 2 -> 3 -> 4 -> 7
```

### 题目二

```javascript
async function async1() {
  console.log('1')
  await async2()
  console.log('2')
}

async function async2() {
  console.log('3')
}

console.log('4')

setTimeout(() => {
  console.log('5')
}, 0)

async1()

new Promise(resolve => {
  console.log('6')
  resolve()
}).then(() => {
  console.log('7')
})

console.log('8')

// 输出: 4 -> 1 -> 3 -> 6 -> 8 -> 2 -> 7 -> 5
```

### 题目三

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i)
  }, 100)
}
// 输出: 3 -> 3 -> 3

// 使用 let 解决
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i)
  }, 100)
}
// 输出: 0 -> 1 -> 2
```

## Node.js 中的事件循环

Node.js 事件循环比浏览器更复杂，包含多个阶段：

```
   ┌───────────────────────────┐
┌─>│        timers            │  执行 setTimeout 和 setInterval 的回调
│  └─────────────┬─────────────┘
│  ┌─────────────▼─────────────┐
│  │  pending callbacks       │  执行被延迟的 I/O 回调
│  └─────────────┬─────────────┘
│  ┌─────────────▼─────────────┐
│  │     idle, prepare         │  内部使用
│  └─────────────┬─────────────┘
│  ┌─────────────▼─────────────┐
│  │        poll               │  获取新的 I/O 事件，执行 I/O 回调
│  └─────────────┬─────────────┘
│  ┌─────────────▼─────────────┐
│  │        check              │  执行 setImmediate 的回调
│  └─────────────┬─────────────┘
│  ┌─────────────▼─────────────┐
│  │   close callbacks         │  执行 close 事件回调
└──┴───────────────────────────┘
```

### process.nextTick 与 Promise.then

```javascript
setTimeout(() => {
  console.log('setTimeout')
}, 0)

process.nextTick(() => {
  console.log('process.nextTick')
})

Promise.resolve().then(() => {
  console.log('Promise.then')
})

// Node.js 输出: process.nextTick -> Promise.then -> setTimeout
```

## 实用技巧

### 分解长任务

```javascript
// 避免阻塞：将大任务拆分为小任务
async function processLargeArray(array) {
  const chunkSize = 1000
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize)
    processChunk(chunk)

    // 让出主线程
    await new Promise(resolve => setTimeout(resolve, 0))
  }
}
```

### 合理使用微任务

```javascript
// 不推荐：在微任务中执行复杂操作
Promise.resolve().then(() => {
  heavyCalculation()
})

// 推荐：使用 setTimeout 分配到下一个宏任务
setTimeout(() => {
  heavyCalculation()
}, 0)
```

### 监控长任务

```javascript
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.duration > 50) {
      console.warn(`长任务检测: ${entry.duration}ms`)
    }
  }
})

observer.observe({ type: 'longtask', buffered: true })
```

## 常见误区

### 误区一：setTimeout(fn, 0) 立即执行

setTimeout(fn, 0) 并不是立即执行，它至少会等待一个宏任务周期，通常是几毫秒。

### 误区二：Promise 比 setTimeout 更快

Promise.then 只是将回调注册到微任务队列，并不会立即执行。事件循环会优先处理所有微任务后再处理下一个宏任务。

### 误区三：async/await 会阻塞

async 函数本身是异步的，只有 await 之后的代码才会等待。async 函数外部的代码会同步执行。

```javascript
async function example() {
  console.log('1')  // 同步执行
  await fetchData()  // 异步等待
  console.log('2')  // 等待后执行
}
```
