# pnpm 使用技巧

## 简介

pnpm（ performant npm）是一个快速、节省空间的包管理器，采用硬链接和符号链接的方式管理 node_modules，相比 npm 和 yarn 在存储和安装速度上有显著优势。

## 核心优势

- **节省磁盘空间**：通过内容寻址存储，相同版本的包只会存储一份
- **安装速度快**：利用并行下载和链接机制
- **严格的依赖管理**：避免幽灵依赖问题
- **支持 monorepo**：天然支持工作空间（workspaces）

## 常用命令

### 安装相关

```bash
# 安装所有依赖
pnpm install

# 安装指定包
pnpm add <package>

# 全局安装
pnpm add -g <package>

# 开发依赖
pnpm add -D <package>

# 生产依赖
pnpm add -P <package>
```

### 管理依赖

```bash
# 更新包
pnpm update

# 更新指定包
pnpm update <package>

# 移除包
pnpm remove <package>

# 清理 node_modules
pnpm rm

# 查看依赖树
pnpm list

# 查看过时的包
pnpm outdated
```

### 运行脚本

```bash
# 运行 package.json 中的脚本
pnpm run <script>

# 运行可用的 scripts
pnpm run

# 简写形式
pnpm dev    # pnpm run dev
pnpm build  # pnpm run build
pnpm test   # pnpm run test
```

## 高级特性

### Monorepo 工作空间

在项目根目录创建 `pnpm-workspace.yaml`：

```yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

### 依赖过滤

```bash
# 只在指定包中运行命令
pnpm --filter <package_name> <command>

# 根据包名模式过滤
pnpm --filter "@scope/*" <command>
```

### 链接本地包

```bash
# 将本地包链接到当前项目
pnpm link <package_path>

# 链接到全局
pnpm link -g <package_path>
```

## 配置文件

### .npmrc 配置

在项目根目录创建 `.npmrc` 文件：

```ini
# 设置 registry
registry=https://registry.npmmirror.com

# 严格模式
strict-peer-dependencies=false

# 自动添加 peerDependencies
auto-install-peers=true

# 启用可访问性检查
access=public
```

## 常见问题

### 幽灵依赖问题

pnpm 默认使用符号链接，不会像 npm 那样产生幽灵依赖（未在 package.json 中声明但可用的依赖）。

### Peer Dependencies

pnpm 对 peer dependencies 要求更严格，建议使用 `pnpm add -P` 或 `pnpm add -D` 明确声明。

### monorepo 中的符号链接

在 monorepo 项目中，子包的 node_modules 目录中的符号链接指向工作空间中的实际包位置。

## 最佳实践

1. **使用 workspace 协议**：在 monorepo 中引用本地包时使用 `workspace:*` 版本协议
2. **配置 .npmrc**：设置合适的 registry 和其他选项
3. **定期清理**：使用 `pnpm store prune` 清理未使用的包
4. **使用 scripts**：在 package.json 中定义常用脚本简化操作
5. **版本锁定**：确保 pnpm-lock.yaml 提交到版本控制

## 常用配置示例

### package.json scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "format": "prettier --write .",
    "test": "vitest"
  }
}
```

## 相关资源

- [pnpm 官方文档](https://pnpm.io/)
- [pnpm GitHub 仓库](https://github.com/pnpm/pnpm)
