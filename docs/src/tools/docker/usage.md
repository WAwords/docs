# Docker 基础使用

## 镜像操作

### 创建镜像

```sh
docker build -t hello-docker .
```

::: tip 网络问题处理
有时会失败，如果是网络的问题，可以配置镜像和 buildkit（有时只配置了镜像还是会报错）：

```json
{
  "registry-mirrors": [
    "https://hub.littlediary.cn"
  ],
  "features": {
    "buildkit": false
  }
}
```
:::

### 查看镜像列表

```sh
docker images
# 或
docker image ls
```

### 运行镜像

```sh
docker run hello-docker
```

## 容器操作

```sh
# 查看运行中的容器
docker ps

# 查看所有容器
docker ps -a

# 停止容器
docker stop <容器ID>

# 删除容器
docker rm <容器ID>
```
