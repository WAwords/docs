
# Web Workers 使用指南

## 概述

Web Workers 是一种在后台线程中运行脚本的技术，可以避免阻塞主线程，提升应用性能。

## 基础使用

### 创建 Worker

```javascript
// 主线程
const worker = new Worker(new URL('./worker.js', import.meta.url));

// 发送消息到 Worker
worker.postMessage({ type: 'calculate', data: 1000 });

// 接收 Worker 消息
worker.onmessage = (e) =&gt; {
  console.log('收到结果:', e.data);
};

// 错误处理
worker.onerror = (error) =&gt; {
  console.error('Worker 错误:', error);
};

// 终止 Worker
worker.terminate();
```

### Worker 文件

```javascript
// worker.js
self.onmessage = (e) =&gt; {
  const { type, data } = e.data;
  
  if (type === 'calculate') {
    const result = heavyCalculation(data);
    self.postMessage(result);
  }
};

function heavyCalculation(num) {
  let sum = 0;
  for (let i = 0; i &lt; num; i++) {
    sum += i;
  }
  return sum;
}
```

## 与主线程通信

### 传递复杂数据

```javascript
// 主线程
const data = {
  numbers: [1, 2, 3, 4, 5],
  config: { multiply: 2 }
};

// 结构化克隆（默认）
worker.postMessage(data);

// 可转移对象（Transferable Objects）
const buffer = new ArrayBuffer(1024);
worker.postMessage(buffer, [buffer]);
```

### 双向通信

```javascript
// 主线程
worker.postMessage({ action: 'init' });

worker.onmessage = (e) =&gt; {
  if (e.data.action === 'progress') {
    updateProgress(e.data.value);
  }
};

// Worker
self.onmessage = (e) =&gt; {
  if (e.data.action === 'init') {
    for (let i = 0; i &lt;= 100; i += 10) {
      self.postMessage({ action: 'progress', value: i });
    }
  }
};
```

## 共享内存 (SharedArrayBuffer)

### 使用 SharedArrayBuffer

```javascript
// 主线程
const buffer = new SharedArrayBuffer(4);
const view = new Int32Array(buffer);
view[0] = 0;

const worker1 = new Worker('./worker.js');
const worker2 = new Worker('./worker.js');

worker1.postMessage({ buffer });
worker2.postMessage({ buffer });

// 等待 Worker 完成
Atomics.wait(view, 0, 0);
console.log('最终值:', view[0]);

// Worker
self.onmessage = (e) =&gt; {
  const view = new Int32Array(e.data.buffer);
  
  // 原子操作
  Atomics.add(view, 0, 1);
  
  // 通知主线程
  Atomics.notify(view, 0, 1);
};
```

## 实际应用场景

### 1. 大数据处理

```javascript
// 主线程
const worker = new Worker('./data-processor.js');

fetch('/large-dataset.json')
  .then(res =&gt; res.json())
  .then(data =&gt; {
    worker.postMessage({ action: 'process', data });
  });

worker.onmessage = (e) =&gt; {
  renderChart(e.data);
};

// Worker
self.onmessage = (e) =&gt; {
  if (e.data.action === 'process') {
    const result = processData(e.data.data);
    self.postMessage(result);
  }
};

function processData(data) {
  // 复杂的数据处理逻辑
  return data.map(item =&gt; ({
    ...item,
    value: calculateComplexValue(item)
  }));
}
```

### 2. 图像/视频处理

```javascript
// 主线程
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const worker = new Worker('./image-processor.js');

// 获取图像数据
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
worker.postMessage({ action: 'filter', imageData }, [imageData.data.buffer]);

worker.onmessage = (e) =&gt; {
  ctx.putImageData(e.data, 0, 0);
};

// Worker
self.onmessage = (e) =&gt; {
  if (e.data.action === 'filter') {
    const filtered = applyFilter(e.data.imageData);
    self.postMessage(filtered, [filtered.data.buffer]);
  }
};

function applyFilter(imageData) {
  const data = imageData.data;
  for (let i = 0; i &lt; data.length; i += 4) {
    const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = gray;
    data[i + 1] = gray;
    data[i + 2] = gray;
  }
  return imageData;
}
```

### 3. 加密/解密

```javascript
// 主线程
const worker = new Worker('./crypto-worker.js');

worker.postMessage({
  action: 'encrypt',
  data: '敏感数据',
  key: 'secret-key'
});

worker.onmessage = (e) =&gt; {
  console.log('加密结果:', e.data);
};

// Worker
import crypto from 'crypto';

self.onmessage = (e) =&gt; {
  const { action, data, key } = e.data;
  
  if (action === 'encrypt') {
    const result = encrypt(data, key);
    self.postMessage(result);
  }
};

function encrypt(data, key) {
  const cipher = crypto.createCipher('aes192', key);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}
```

## 注意事项

### 限制
- 无法访问 DOM
- 无法使用 `window`、`document` 对象
- 无法使用某些 API（如 `alert`）

### 性能考虑
- 通信有开销，适合耗时较长的任务
- 使用 Transferable Objects 减少复制
- 避免频繁创建和销毁 Worker

### 最佳实践
- 使用 Worker 池管理多个 Worker
- 为 Worker 添加超时机制
- 使用消息队列管理任务
