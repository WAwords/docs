# 前端开发调试技巧

## console 相关方法

### console.log()
最常用的调试方法，用于输出信息。

```javascript
const name = '张三';
const age = 25;

console.log('姓名:', name, '年龄:', age);
```

### console.warn()
输出警告信息，带有黄色图标和背景色。

```javascript
console.warn('这是一条警告信息');
```

### console.error()
输出错误信息，带有红色图标和背景色。

```javascript
console.error('这是一条错误信息');
```

### console.info()
输出一般信息，与 console.log 类似。

```javascript
console.info('这是一条普通信息');
```

### console.debug()
输出调试信息，仅在调试模式下可见。

```javascript
console.debug('这是一条调试信息');
```

### console.table()
以表格形式输出数据，适合查看数组或对象。

```javascript
const users = [
  { name: '张三', age: 25, city: '北京' },
  { name: '李四', age: 30, city: '上海' },
  { name: '王五', age: 28, city: '广州' },
];

console.table(users);
```

### console.dir()
以交互式列表形式显示对象的属性。

```javascript
const obj = { name: '张三', age: 25, address: { city: '北京', district: '朝阳区' } };
console.dir(obj);
```

### console.time() 和 console.timeEnd()
用于计算代码执行时间。

```javascript
console.time('循环耗时');
for (let i = 0; i &lt; 1000000; i++) {
  // 一些操作
}
console.timeEnd('循环耗时');
```

### console.count()
记录某个操作执行的次数。

```javascript
for (let i = 0; i &lt; 5; i++) {
  console.count('循环次数');
}
```

### console.assert()
仅在条件为 false 时输出信息。

```javascript
const age = 15;
console.assert(age &gt;= 18, '年龄不足 18 岁');
```

### console.group() 和 console.groupEnd()
将相关的日志分组显示，可折叠。

```javascript
console.group('用户信息');
console.log('姓名: 张三');
console.log('年龄: 25');
console.group('地址');
console.log('城市: 北京');
console.log('区: 朝阳区');
console.groupEnd();
console.groupEnd();
```

### console.clear()
清空控制台。

```javascript
console.clear();
```

## 断点调试

### debugger 语句
在代码中添加 debugger 语句，浏览器会在执行到此处时暂停。

```javascript
function calculateSum(a, b) {
  debugger; // 浏览器会在此处暂停
  return a + b;
}

calculateSum(1, 2);
```

### 浏览器 DevTools 断点
1. 打开浏览器开发者工具（F12 或 Ctrl+Shift+I）
2. 切换到 Sources 面板
3. 找到要调试的文件
4. 点击行号设置断点
5. 刷新页面或触发代码执行

## 元素检查

### 检查元素
1. 右键点击页面元素，选择"检查"
2. 或按 F12 打开开发者工具，使用选择工具（Ctrl+Shift+C）
3. 在 Elements 面板中查看和修改元素属性

### 实时修改样式
1. 在 Elements 面板中选择元素
2. 在 Styles 面板中直接修改 CSS
3. 所有修改会实时反映在页面上

## 网络请求调试

### Network 面板
1. 打开 Network 面板
2. 刷新页面或触发请求
3. 查看所有网络请求
4. 点击请求可查看详细信息（Headers、Response、Timing 等）

### 筛选请求
- 按类型筛选：All、XHR、Fetch、JS、CSS、Img 等
- 按域名筛选
- 使用搜索框搜索

## 性能分析

### Performance 面板
1. 打开 Performance 面板
2. 点击录制按钮（圆形图标）
3. 执行要分析的操作
4. 停止录制
5. 查看性能报告

### Lighthouse 审计
1. 打开 Lighthouse 面板
2. 选择要审计的项目（Performance、Accessibility、Best Practices 等）
3. 点击 Generate report
4. 查看审计报告和改进建议

## 移动端调试

### 模拟器
使用 Chrome DevTools 的 Device Toolbar（Ctrl+Shift+M）模拟各种移动设备。

### 真机调试
- iOS：使用 Safari 开发工具
- Android：使用 Chrome 远程调试

## 其他调试技巧

### 复制对象
右键点击控制台中的对象，选择"Store as global variable"，可将其保存为全局变量以便后续操作。

### 监听事件
使用 monitorEvents() 监听元素的事件。

```javascript
const button = document.querySelector('button');
monitorEvents(button, ['click', 'mouseenter']);
```

### 检查 DOM 变化
使用 MutationObserver 监听 DOM 变化。

```javascript
const observer = new MutationObserver((mutations) =&gt; {
  mutations.forEach((mutation) =&gt; {
    console.log(mutation);
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
});
```

### 禁用缓存
在 Network 面板中勾选 Disable cache，确保每次刷新都获取最新资源。

### 快速切换主题
在 DevTools 设置中可以切换浅色/深色主题。
