# VS Code 配置与插件

本文档整理 VS Code 常用配置与推荐插件。

## 常用配置

### settings.json 配置

```json
{
  "editor.fontSize": 14,
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.wordWrap": "on",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  "files.exclude": {
    "**/.git": true,
    "**/.DS_Store": true,
    "**/node_modules": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/bower_components": true,
    "**/dist": true
  },
  "terminal.integrated.defaultProfile.windows": "PowerShell",
  "workbench.colorTheme": "One Dark Pro",
  "workbench.iconTheme": "vscode-icons"
}
```

### 快捷键配置

打开快捷键设置：`Ctrl + K` 然后 `Ctrl + S`

常用快捷键：

| 快捷键 | 功能 |
|--------|------|
| `Ctrl + P` | 快速打开文件 |
| `Ctrl + Shift + P` | 命令面板 |
| `Ctrl + /` | 注释/取消注释 |
| `Ctrl + D` | 选中下一个相同内容 |
| `Ctrl + Shift + F` | 全局搜索 |
| `Ctrl + Shift + H` | 全局替换 |
| `Alt + 上/下` | 移动当前行 |
| `Ctrl + Shift + K` | 删除当前行 |
| `Ctrl + Shift + L` | 选中所有匹配项 |

## 推荐插件

### 主题与外观

- **One Dark Pro** - 深色主题
- **vscode-icons** - 文件图标
- **Material Icon Theme** - 另一款图标主题

### 代码格式化

- **Prettier** - 代码格式化工具
- **ESLint** - JavaScript/TypeScript 代码检查
- **Vetur** - Vue 开发工具
- **Volar** - Vue 3 开发工具

### Git 相关

- **GitLens** - Git 增强工具
- **Git Graph** - Git 图形化查看
- **Git History** - Git 历史记录查看

### 其他实用插件

- **Auto Rename Tag** - 自动重命名 HTML 标签
- **Bracket Pair Colorizer 2** - 括号颜色配对
- **Code Spell Checker** - 拼写检查
- **Live Server** - 本地服务器
- **Path Intellisense** - 路径自动补全
- **Chinese (Simplified) Language Pack** - 中文语言包

## 工作区配置

在项目根目录创建 `.vscode` 文件夹，包含以下文件：

### settings.json（工作区设置）

```json
{
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "prettier.requireConfig": true
}
```

### extensions.json（推荐插件）

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "eamodio.gitlens"
  ]
}
```
