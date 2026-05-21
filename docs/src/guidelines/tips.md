# 实用技巧

本文档收录各类实用技巧与零散知识点。

## 右键菜单配置

::: tip
使用注册表来变更右键菜单
:::

### 1. 进入注册表

打开注册表编辑器：按下 `Win + R` 键，输入 `regedit` 进入。

### 2. 定位到注册表项

有以下四种：

- 在 `HKEY_CLASSES_ROOT\DesktopBackground\shell` 下创建，只会在 `桌面` 右击菜单中显示；
- 在 `HKEY_CLASSES_ROOT\Directory\Background\shell` 下创建，则在 `桌面和文件夹空白处` 右击菜单都会显示；
- 在 `HKEY_CLASSES_ROOT\Directory\shell` 下创建，则只会在选中 `文件夹` 的右击菜单中显示；
- 在 `HKEY_CLASSES_ROOT\*\shell` 下创建，则只会在选中 `文件` 的右击菜单中显示。

### 3. 创建项

在 shell 下创建项，如 `Cursor`，在 `Cursor` 下创建 `command` 项，并设置 `默认` 值为 `"C:\Users\Administrator\AppData\Local\Programs\cursor\Cursor.exe" "%1"`。

| 参数 | 说明 |
|------|------|
| %1 | 传入当前文件路径 |
| %2 | 系统默认的打印机 |
| %3 | 文件扇区 |
| %4 | 端口 |
| %D | 文件路径 |
| %L | 文件长路径 |
| %V | 文件路径 |
| %W | 当前文件的父目录的路径 |

## TypeScript 函数重载

所有 TS 最终都会编译成 JS，而 JS 的重载比较 LOW，所以 TS 写重载不过是添加了点注释。

```ts
export function add(a: number, b: number): number;
export function add(a: { a?: number; b: number }): number;

export function add(a: number | { a?: number; b: number }, b?: number): number {
  if (typeof a === "number") {
    // 处理数字参数
  } else {
    ({ a = 0, b } = a); // JS 函数重载中，解构赋值比较好用
  }
  // 逻辑...
}
```

## 正则表达式速查

| 元字符 | 说明 |
|--------|------|
| `.` | 匹配除换行符以外的任意单个字符 |
| `*` | 匹配前面的子表达式零次或多次 |
| `+` | 匹配前面的子表达式一次或多次 |
| `?` | 匹配前面的子表达式零次或一次 |
| `\|` | 匹配左边或右边的表达式 |
| `()` | 标记一个子表达式的开始和结束，可以捕获子匹配 |
| `[]` | 用来表示一组字符，如 `[amk]` 匹配 'a'、'm' 或 'k' |
| `{}` | 用于指定前面的子表达式的出现次数 |

## 项目创建

使用 Vite 创建项目：

```sh
pnpm create vite
```

## 命令行工具

### 端口占用查询

```sh
# 查占用端口的 PID（查到后到资源管理器找）
netstat /ano | findstr 9999

# 查占用的程序
tasklist | findstr [PID]

# 杀死进程
taskkill /IM nginx.exe /F
```
