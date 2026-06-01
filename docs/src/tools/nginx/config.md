
# Nginx 常用配置

本文档收录 Nginx 常用配置及最佳实践。

## 基本配置

### 1. 启动、停止和重载

```sh
# 启动 Nginx
nginx

# 停止 Nginx（立即停止）
nginx -s stop

# 优雅停止 Nginx（处理完当前请求后停止）
nginx -s quit

# 重载配置（平滑重启）
nginx -s reload

# 查看 Nginx 版本
nginx -v

# 测试配置文件是否正确
nginx -t
```

### 2. 基本结构

```nginx
# 全局配置块
user www-data;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /var/run/nginx.pid;

# events 块
events {
    worker_connections 1024;
}

# http 块
http {
    include mime.types;
    default_type application/octet-stream;
    
    # 日志格式
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';
    
    access_log /var/log/nginx/access.log main;
    
    sendfile on;
    keepalive_timeout 65;
    
    # server 块
    server {
        listen 80;
        server_name example.com;
        
        location / {
            root /var/www/html;
            index index.html index.htm;
        }
    }
}
```

## 常见场景配置

### 1. 静态文件服务器

```nginx
server {
    listen 80;
    server_name static.example.com;
    
    # 静态文件目录
    root /data/static;
    index index.html;
    
    # 缓存配置
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|pdf)$ {
        expires 7d;
        add_header Cache-Control "public, immutable";
    }
    
    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss;
}
```

### 2. 反向代理

```nginx
server {
    listen 80;
    server_name api.example.com;
    
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # 超时设置
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

### 3. 负载均衡

```nginx
upstream backend {
    # 轮询（默认）
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002 weight=3; # 权重
}

server {
    listen 80;
    server_name app.example.com;
    
    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 4. HTTPS 配置

```nginx
server {
    listen 443 ssl http2;
    server_name example.com;
    
    # SSL 证书
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # SSL 配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    location / {
        root /var/www/html;
        index index.html;
    }
}

# HTTP 重定向到 HTTPS
server {
    listen 80;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}
```

### 5. Vue/React 单页应用

```nginx
server {
    listen 80;
    server_name spa.example.com;
    
    root /var/www/spa;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API 代理
    location /api {
        proxy_pass http://127.0.0.1:3000;
        rewrite ^/api/(.*)$ /$1 break;
    }
}
```

### 6. 跨域配置

```nginx
server {
    listen 80;
    server_name cors.example.com;
    
    add_header 'Access-Control-Allow-Origin' '*';
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE';
    add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization';
    
    # 处理 OPTIONS 预检请求
    if ($request_method = 'OPTIONS') {
        return 204;
    }
    
    location / {
        proxy_pass http://127.0.0.1:3000;
    }
}
```

## 安全配置

### 1. 限制访问 IP

```nginx
location /admin {
    allow 192.168.1.0/24;
    deny all;
}
```

### 2. 隐藏版本号

```nginx
http {
    server_tokens off;
}
```

### 3. 限流配置

```nginx
http {
    limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;
    
    server {
        location /api {
            limit_req zone=mylimit;
            proxy_pass http://backend;
        }
    }
}
```

## 常用变量

| 变量 | 说明 |
|------|------|
| $host | 主机名 |
| $remote_addr | 客户端 IP |
| $request_uri | 请求 URI |
| $request_method | 请求方法 |
| $status | 响应状态码 |
| $http_user_agent | 用户代理 |
| $http_referer | 来源页面 |
| $scheme | 协议（http/https） |
