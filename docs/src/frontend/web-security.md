# Web 安全防护指南

## 前言

Web 安全是前端开发中非常重要的一环，了解常见的安全威胁和防护措施可以帮助我们构建更安全的应用程序。

---

## 1. XSS（跨站脚本攻击）

### 什么是 XSS

XSS（Cross-Site Scripting）是一种代码注入攻击，攻击者通过在网页中插入恶意脚本，当其他用户访问该网页时，恶意脚本会在用户的浏览器中执行。

### 类型

1. **存储型 XSS**：恶意脚本存储在服务器数据库中
2. **反射型 XSS**：恶意脚本通过 URL 参数传递
3. **DOM 型 XSS**：恶意脚本直接在客户端 DOM 中执行

### 防护措施

```javascript
// #region ======================== XSS 防护方法 // #endregion ======================== End of XSS 防护方法

// 1. 转义特殊字符
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// 2. 使用 textContent 代替 innerHTML
element.textContent = userInput; // 安全
element.innerHTML = userInput; // 危险

// 3. 设置 CSP（内容安全策略）
// <meta http-equiv="Content-Security-Policy" content="default-src 'self'">

// 4. 对用户输入进行验证和过滤
function sanitizeInput(input) {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// 5. 使用框架的自动转义功能
// React: JSX 默认会转义内容
// Vue: {{ }} 插值表达式默认转义

// #endregion ======================== End of XSS 防护方法
```

---

## 2. CSRF（跨站请求伪造）

### 什么是 CSRF

CSRF（Cross-Site Request Forgery）是一种攻击，攻击者诱导用户在已登录的情况下，向目标网站发送非自愿的请求。

### 防护措施

```javascript
// #region ======================== CSRF 防护方法 // #endregion ======================== End of CSRF 防护方法

// 1. 使用 CSRF Token
// 服务器生成 Token，前端在请求中携带

// 2. 验证 Referer 或 Origin 头
// 检查请求来源是否合法

// 3. 使用 SameSite Cookie 属性
// 设置 Cookie 的 SameSite 属性为 Strict 或 Lax
document.cookie = "sessionId=xxx; SameSite=Strict; Secure";

// 4. 敏感操作使用 POST 请求
// 不要使用 GET 请求进行数据修改操作

// 5. 添加双重 Cookie 验证
// 在请求头和 Cookie 中都携带相同的 Token

// #endregion ======================== End of CSRF 防护方法
```

---

## 3. SQL 注入

### 什么是 SQL 注入

攻击者通过在输入字段中注入 SQL 代码，来操纵数据库执行恶意操作。

### 防护措施

```javascript
// #region ======================== SQL 注入防护方法 // #endregion ======================== End of SQL 注入防护方法

// 1. 使用参数化查询（Prepared Statements）
// 错误示例（危险）
const query = `SELECT * FROM users WHERE id = ${userId}`;

// 正确示例（安全）
// 使用数据库驱动的参数化查询功能
// const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [userId]);

// 2. 输入验证和过滤
// 对用户输入进行类型和格式验证

// 3. 使用 ORM 框架
// Sequelize、TypeORM 等 ORM 框架会自动处理 SQL 注入防护

// 4. 最小权限原则
// 数据库账号只授予必要的权限

// 5. 避免直接拼接 SQL 语句

// #endregion ======================== End of SQL 注入防护方法
```

---

## 4. 点击劫持（Clickjacking）

### 什么是点击劫持

攻击者使用透明的 iframe 覆盖在正常网页上，诱导用户点击看似无害的按钮，实际却点击了恶意页面。

### 防护措施

```html
<!-- #region ======================== 点击劫持防护方法 // #endregion ======================== End of 点击劫持防护方法 -->

<!-- 1. 设置 X-Frame-Options 响应头 -->
<!-- X-Frame-Options: DENY -->
<!-- X-Frame-Options: SAMEORIGIN -->

<!-- 2. 使用 Content-Security-Policy 的 frame-ancestors 指令 -->
<!-- Content-Security-Policy: frame-ancestors 'none' -->
<!-- Content-Security-Policy: frame-ancestors 'self' -->

<!-- 3. 使用 JavaScript 防止页面被嵌套 -->
<script>
  if (window !== window.top) {
    window.top.location.href = window.location.href;
  }
</script>

<!-- #endregion ======================== End of 点击劫持防护方法 -->
```

---

## 5. HTTPS 与数据传输安全

### 重要性

HTTPS 通过 SSL/TLS 加密数据传输，防止数据被窃听和篡改。

### 配置要点

```nginx
# #region ======================== HTTPS 配置示例 // #endregion ======================== End of HTTPS 配置示例

# Nginx HTTPS 配置示例
server {
    listen 443 ssl http2;
    server_name example.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # 启用 HSTS（HTTP Strict Transport Security）
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # 配置安全的密码套件
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
}

# #endregion ======================== End of HTTPS 配置示例
```

---

## 6. Cookie 安全

### 安全配置

```javascript
// #region ======================== Cookie 安全配置 // #endregion ======================== End of Cookie 安全配置

// 设置安全的 Cookie
document.cookie = "sessionId=abc123; " +
  "Secure; " +           // 仅通过 HTTPS 传输
  "HttpOnly; " +         // 防止 JavaScript 访问
  "SameSite=Strict; " +  // 防止 CSRF
  "Path=/; " +
  "Max-Age=3600";        // 设置过期时间

// #endregion ======================== End of Cookie 安全配置
```

---

## 7. 前端安全最佳实践清单

- [ ] 对所有用户输入进行验证、过滤和转义
- [ ] 避免使用 `eval()`、`innerHTML` 等危险函数
- [ ] 使用 HTTPS 全站加密
- [ ] 配置 CSP（内容安全策略）
- [ ] 设置安全的响应头（X-Frame-Options、X-XSS-Protection、X-Content-Type-Options 等）
- [ ] 定期更新依赖包，修复已知漏洞
- [ ] 敏感数据不要存储在前端（localStorage、sessionStorage）
- [ ] 使用安全的认证方式（JWT、OAuth 2.0）
- [ ] 实现密码强度检测和安全存储（使用 bcrypt、argon2 等哈希算法）
- [ ] 进行安全测试和代码审计

---

## 8. 常用安全响应头

```http
# #region ======================== 安全响应头配置 // #endregion ======================== End of 安全响应头配置

Content-Security-Policy: default-src 'self'
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Referrer-Policy: strict-origin-when-cross-origin

# #endregion ======================== End of 安全响应头配置
```

---

## 总结

Web 安全是一个持续的过程，需要我们在开发的每个阶段都保持安全意识。通过了解常见的攻击手段和防护措施，我们可以构建更加安全可靠的 Web 应用。
