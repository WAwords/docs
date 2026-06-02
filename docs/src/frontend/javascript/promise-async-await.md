# Promise 与 async/await 实战指南

## Promise 基础

### Promise 状态

Promise 有三种状态：

- **pending（进行中）**：初始状态，既没有被完成，也没有被拒绝
- **fulfilled（已完成）**：意味着操作成功完成
- **rejected（已拒绝）**：意味着操作失败

### 创建 Promise

```javascript
const promise = new Promise((resolve, reject) => {
  // 异步操作
  setTimeout(() => {
    resolve('成功');
    // reject('失败');
  }, 1000);
});
```

### Promise 链式调用

```javascript
fetch('/api/data')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    return processData(data);
  })
  .then(processedData => {
    console.log(processedData);
  })
  .catch(error => {
    console.error('出错了:', error);
  })
  .finally(() => {
    console.log('操作完成');
  });
```

## Promise 静态方法

### Promise.all()

等待所有 Promise 都完成，如果有一个失败则立即失败。

```javascript
Promise.all([
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments')
])
  .then(responses => Promise.all(responses.map(r => r.json())))
  .then(([users, posts, comments]) => {
    console.log(users, posts, comments);
  });
```

### Promise.allSettled()

等待所有 Promise 完成，无论成功或失败。

```javascript
Promise.allSettled([
  fetch('/api/data1'),
  fetch('/api/data2')
])
  .then(results => {
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        console.log('成功:', result.value);
      } else {
        console.log('失败:', result.reason);
      }
    });
  });
```

### Promise.race()

等待第一个完成的 Promise（无论成功或失败）。

```javascript
Promise.race([
  fetch('/api/data'),
  new Promise((_, reject) => 
    setTimeout(() => reject(new Error('超时')), 5000)
  )
])
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### Promise.any()

等待第一个成功的 Promise。

```javascript
Promise.any([
  fetch('/api/data1'),
  fetch('/api/data2'),
  fetch('/api/data3')
])
  .then(data => console.log('第一个成功的数据:', data))
  .catch(error => console.error('所有都失败了:', error));
```

## async/await 语法

### 基础用法

```javascript
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('出错了:', error);
    throw error;
  }
}
```

### 并行请求

```javascript
async function fetchMultipleData() {
  const [users, posts] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json())
  ]);
  return { users, posts };
}
```

### 顺序执行与并行执行对比

```javascript
// 顺序执行（较慢）
async function sequential() {
  const result1 = await doTask1();
  const result2 = await doTask2();
  const result3 = await doTask3();
  return [result1, result2, result3];
}

// 并行执行（较快）
async function parallel() {
  const promise1 = doTask1();
  const promise2 = doTask2();
  const promise3 = doTask3();
  const result1 = await promise1;
  const result2 = await promise2;
  const result3 = await promise3;
  return [result1, result2, result3];
}
```

## 实战技巧

### 超时控制

```javascript
function withTimeout(promise, timeoutMs) {
  const timeout = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('请求超时')), timeoutMs)
  );
  return Promise.race([promise, timeout]);
}

// 使用
try {
  const data = await withTimeout(fetch('/api/data'), 3000);
} catch (error) {
  console.error(error.message);
}
```

### 重试机制

```javascript
async function retry(fn, maxRetries = 3) {
  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      console.log(`第 ${i + 1} 次重试...`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw lastError;
}

// 使用
const data = await retry(() => fetch('/api/data').then(r => r.json()));
```

### 批量处理并发限制

```javascript
async function poolLimit(promises, limit) {
  const results = [];
  const executing = [];

  for (const promise of promises) {
    const p = Promise.resolve(promise).then(result => {
      results.push(result);
    });
    executing.push(p);

    if (executing.length >= limit) {
      await Promise.race(executing);
      executing.splice(executing.findIndex(e => e === p), 1);
    }
  }

  await Promise.all(executing);
  return results;
}
```
