# 前端开发中 console.log 技巧

console.log 是前端开发中最常用的调试工具之一，但除了基本的日志输出外，它还有许多有用的功能。本文将介绍一些 console.log 的高级技巧。

## 基本用法

### console.log()

输出普通信息。

```javascript
console.log('Hello, World!');
console.log('姓名:', '张三', '年龄:', 18);
```

### console.error()

输出错误信息，会以红色显示。

```javascript
console.error('这是一条错误信息');
```

### console.warn()

输出警告信息，会以黄色显示。

```javascript
console.warn('这是一条警告信息');
```

### console.info()

输出信息性提示。

```javascript
console.info('这是一条信息提示');
```

## 格式化输出

### 使用占位符

console.log 支持 C 语言风格的占位符：

- `%s` - 字符串
- `%d` 或 `%i` - 整数
- `%f` - 浮点数
- `%o` - 对象
- `%c` - CSS 样式

```javascript
// 字符串占位符
console.log('姓名: %s, 年龄: %d', '张三', 18);

// CSS 样式占位符
console.log('%c 这是一段带样式的文字 ', 'color: white; background-color: blue; font-size: 16px; padding: 5px;');

// 多种样式
console.log('%c 蓝色 %c 红色 %c 绿色', 'color: blue;', 'color: red;', 'color: green;');
```

## 对象和数组的输出

### console.dir()

以树状结构显示对象的所有属性和方法，比 console.log 更详细。

```javascript
const obj = {
  name: '张三',
  age: 18,
  address: {
    city: '北京',
    district: '朝阳区'
  }
};
console.dir(obj);
```

### console.table()

以表格形式显示数组或对象，更直观易读。

```javascript
const users = [
  { id: 1, name: '张三', age: 18 },
  { id: 2, name: '李四', age: 20 },
  { id: 3, name: '王五', age: 22 }
];
console.table(users);

// 只显示指定列
console.table(users, ['name', 'age']);
```

## 分组输出

### console.group() 和 console.groupEnd()

将相关的日志分组显示，可以折叠。

```javascript
console.group('用户信息');
console.log('姓名: 张三');
console.log('年龄: 18');
console.groupEnd();

console.group('地址信息');
console.log('城市: 北京');
console.log('区域: 朝阳区');
console.groupEnd();
```

### console.groupCollapsed()

默认折叠的分组。

```javascript
console.groupCollapsed('详细信息');
console.log('这是折叠的内容');
console.groupEnd();
```

## 计时功能

### console.time() 和 console.timeEnd()

计算代码执行时间。

```javascript
console.time('循环耗时');
for (let i = 0; i < 1000000; i++) {
  // 一些操作
}
console.timeEnd('循环耗时');
```

### console.timeLog()

在计时过程中输出中间时间。

```javascript
console.time('总耗时');
// 步骤1
console.timeLog('总耗时', '步骤1完成');
// 步骤2
console.timeLog('总耗时', '步骤2完成');
console.timeEnd('总耗时');
```

## 计数功能

### console.count()

记录代码执行次数。

```javascript
for (let i = 0; i < 5; i++) {
  console.count('循环次数');
}
```

### console.countReset()

重置计数器。

```javascript
console.count('计数器');
console.count('计数器');
console.countReset('计数器');
console.count('计数器'); // 重新从1开始
```

## 断言功能

### console.assert()

条件为 false 时输出错误信息。

```javascript
const age = 17;
console.assert(age >= 18, '年龄必须大于等于18岁');
```

## 堆栈跟踪

### console.trace()

显示函数调用堆栈。

```javascript
function a() {
  b();
}

function b() {
  c();
}

function c() {
  console.trace('调用堆栈');
}

a();
```

## 清空控制台

### console.clear()

清空控制台输出。

```javascript
console.clear();
```

## 实用技巧

### 使用 JSON.stringify 格式化输出

```javascript
const obj = { a: 1, b: 2, c: 3 };
console.log(JSON.stringify(obj, null, 2));
```

### 使用解构赋值快速查看对象

```javascript
const user = { name: '张三', age: 18, city: '北京' };
console.log({ user }); // 会显示变量名和值
```

### 给输出添加标签

```javascript
console.log('%c [INFO] ', 'color: blue; font-weight: bold;', '这是一条信息');
console.log('%c [WARN] ', 'color: orange; font-weight: bold;', '这是一条警告');
console.log('%c [ERROR] ', 'color: red; font-weight: bold;', '这是一条错误');
```
