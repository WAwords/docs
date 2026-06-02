# Chrome 开发者工具使用技巧

本文整理 Chrome DevTools（Chrome Developer Tools）在日常前端开发与调试中的常用面板、技巧与最佳实践。

## 打开方式

| 方式 | 说明 |
|------|------|
| `F12` 或 `Ctrl + Shift + I` | 打开/关闭开发者工具 |
| `Ctrl + Shift + J` | 直接打开 Console 面板 |
| `Ctrl + Shift + C` | 进入元素选择模式 |
| `Ctrl + Shift + Delete` | 打开清除浏览数据对话框 |

## 常用面板概览

### Elements 元素面板

- 检查和实时编辑 DOM 树与 CSS
- 支持拖拽节点、删除节点
- 在 Styles 面板中可以查看样式的继承与覆盖关系
- 使用 `Computed` 标签查看最终计算样式
- 使用 `Filter` 过滤样式（支持按属性名搜索）

### Console 控制台

```javascript
// #region ======================== 常用调试 API ========================
console.log("普通信息")
console.info("提示信息")
console.warn("警告信息")
console.error("错误信息")
console.table([{ name: "Tom", age: 18 }, { name: "Lucy", age: 20 }])
console.group("分组标题")
  console.log("分组内日志")
console.groupEnd()

// 断言
console.assert(1 === 2, "表达式不成立时输出")

// 计时
console.time("耗时")
// ... 业务代码
console.timeEnd("耗时")

// 追踪函数调用栈
console.trace("trace")
// #endregion ======================== End of 常用调试 API ========================
```

实用技巧：

- `$0` 表示当前在 Elements 中选中的元素
- `$(selector)` 等价于 `document.querySelector`
- `$$(selector)` 等价于 `document.querySelectorAll`
- `$_` 表示上一条命令的执行结果
- `copy(object)` 将对象复制到剪贴板
- 使用 `console.dir()` 打印 DOM 节点的完整属性

### Sources 源码面板

- 在源码中点击行号即可添加断点
- 条件断点：右键断点 → `Edit breakpoint` 输入表达式
- 日志点（Logpoint）：右键行号 → `Add logpoint`，无需修改源码即可输出日志
- 使用 `Call Stack` 面板查看调用链
- 使用 `Scope` 面板查看当前作用域变量
- 支持 `Pretty Print`（`{}` 图标）压缩代码格式化
- 使用 `Ctrl + O` 快速打开文件
- 使用 `Ctrl + Shift + O` 跳转到函数

### Network 网络面板

```text
# #region ======================== 过滤请求 ========================
/(?:\.js|\.css|\.png|\.jpg)$/  // 正则过滤
domain:api.example.com         // 按域名过滤
status-code:404                // 按状态码过滤
larger-than:100k               // 按响应大小过滤
# #endregion ======================== End of 过滤请求 ========================
```

实用技巧：

- 勾选 `Preserve log` 保留跳转页面之前的请求
- 勾选 `Disable cache` 禁用浏览器缓存
- 右键请求 → `Copy as fetch` 直接拿到 `fetch` 代码
- 右键请求 → `Copy as cURL` 复制为 cURL 命令
- 在 Initiator 列查看请求发起者与调用栈
- 右键请求 → `Block request URL` 模拟接口异常

### Performance 性能面板

录制步骤：

1. 打开 Performance 面板
2. 点击左上角 `Record`（或 `Ctrl + E`）开始录制
3. 操作页面
4. 点击 `Stop` 停止录制

面板分析：

- `FPS` 图表：绿色越高越好，红色表示掉帧
- `Main`：主线程任务堆叠，黄色为脚本执行，紫色为样式与布局
- `Timings`：关键时间点（FCP、LCP 等）
- `Summary`：脚本执行、渲染、绘制各阶段耗时

### Memory 内存面板

用于排查内存泄漏，可执行以下操作：

- `Heap snapshot`：堆快照，对比两个时刻的快照可发现泄漏对象
- `Allocation instrumentation on timeline`：按时间维度记录内存分配
- `Allocation sampling`：采样分配，性能开销较低

常见内存泄漏场景：

- 意外的全局变量
- 未清理的定时器（`setInterval` / `setTimeout`）
- 闭包引用导致无法回收
- DOM 节点被移除但事件监听未解绑

### Application 应用面板

- `Local Storage` / `Session Storage`：查看、修改本地存储
- `IndexedDB`：浏览 IndexedDB 数据库
- `Cookies`：查看、删除、修改 Cookie
- `Cache Storage`：查看 Service Worker 缓存
- `Frames`：查看页面中的 iframe 结构

## 调试技巧

### 在源代码中调试

```javascript
// #region ======================== 条件断点示例 ========================
function getUser(id) {
  debugger // 手动断点，DevTools 打开时会自动暂停
  return fetch(`/api/user/${id}`).then((res) => res.json())
}
// #endregion ======================== End of 条件断点示例 ========================
```

### 在控制台中引用当前选中元素

```javascript
$0.style.background = "red"
$0.addEventListener("click", () => console.log("clicked"))
```

### 监控事件

```javascript
// 监控指定元素上的 click 事件
monitorEvents($0, "click")
// 停止监控
unmonitorEvents($0, "click")
```

### 黑盒脚本（Blackbox）

在 Sources 面板右键第三方脚本 → `Add script to ignore list`，调试时将跳过该脚本，避免进入框架内部源码。

## 移动端调试

### 设备模拟

- 打开 DevTools → 点击左上角设备图标（或 `Ctrl + Shift + M`）进入响应式模式
- 顶部可以选择设备型号、网络环境、CPU 限速
- 支持自定义尺寸与 DPR（设备像素比）

### 真机调试（Android）

1. 手机开启 `开发者选项` → `USB 调试`
2. 使用数据线连接电脑
3. 电脑端 Chrome 访问 `chrome://inspect/#devices`
4. 在手机上确认授权调试
5. 在 `Remote Target` 中点击 `Inspect`

### 真机调试（iOS）

1. Mac 安装 `ios-webkit-debug-proxy`
2. iPhone 通过数据线连接 Mac
3. iPhone Safari 打开目标页面
4. Mac 端 Chrome 访问 `chrome://inspect/#devices` 进行调试

## 常用快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl + [` / `Ctrl + ]` | 切换 DevTools 面板 |
| `Ctrl + Shift + P` | 打开命令菜单（Command Menu） |
| `Ctrl + K` | 在 Elements 中按属性搜索 |
| `Ctrl + F` | 在当前面板内搜索 |
| `Esc` | 打开/关闭抽屉式二级面板 |
| `Ctrl + Shift + M` | 切换设备模拟模式 |
| `Ctrl + Shift + Delete` | 清除浏览数据 |

## 实用命令菜单

按 `Ctrl + Shift + P` 打开命令菜单，常用命令：

- `Show Coverage`：查看代码覆盖率
- `Capture full size screenshot`：截取整页截图
- `Capture node screenshot`：截取指定节点截图
- `Show Paint Rectangles`：高亮重绘区域
- `Show Layout Shift Regions`：高亮布局偏移区域
- `Show FPS Meter`：显示实时 FPS
- `Throttling: CPU 4x slowdown`：CPU 限速
- `Throttling: Slow 3G`：网络限速

## 相关资源

- [Chrome DevTools 官方文档](https://developer.chrome.com/docs/devtools/)
- [Vue.js 常用技巧](./vuejs/tips.md)
- [前端性能优化](./performance-optimization.md)
