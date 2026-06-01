
# 常用正则表达式

正则表达式是一种强大的文本匹配工具，在开发中经常用于验证、提取和替换文本。本文整理了一些常用的正则表达式，方便日常开发使用。

## 验证类

### 邮箱
```javascript
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
```

### 手机号（中国大陆）
```javascript
const phoneRegex = /^1[3-9]\d{9}$/;
```

### 身份证号（18位）
```javascript
const idCardRegex = /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/;
```

### 密码强度
至少8位，包含大小写字母和数字：
```javascript
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
```

### URL
```javascript
const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
```

## 提取类

### 提取URL参数
```javascript
function getUrlParams(url) {
  const params = {};
  const regex = /[?&amp;]([^=#]+)=([^&amp;#]*)/g;
  let match;
  while ((match = regex.exec(url)) !== null) {
    params[match[1]] = decodeURIComponent(match[2]);
  }
  return params;
}
```

### 提取日期（YYYY-MM-DD）
```javascript
const dateRegex = /\d{4}-\d{2}-\d{2}/g;
```

### 提取中文
```javascript
const chineseRegex = /[\u4e00-\u9fa5]+/g;
```

### 提取数字
```javascript
const numberRegex = /\d+/g;
```

## 替换类

### 去除空格
去除所有空格：
```javascript
const removeAllSpaces = str =&gt; str.replace(/\s+/g, '');
```

去除首尾空格：
```javascript
const trim = str =&gt; str.replace(/^\s+|\s+$/g, '');
```

### 驼峰转下划线
```javascript
const camelToSnake = str =&gt; str.replace(/([A-Z])/g, '_$1').toLowerCase();
```

### 下划线转驼峰
```javascript
const snakeToCamel = str =&gt; str.replace(/_([a-z])/g, (_, c) =&gt; c.toUpperCase());
```

## 常见正则符号说明

| 符号 | 说明 |
|------|------|
| `^` | 匹配字符串开头 |
| `$` | 匹配字符串结尾 |
| `.` | 匹配任意字符 |
| `*` | 匹配前面的元素0次或多次 |
| `+` | 匹配前面的元素1次或多次 |
| `?` | 匹配前面的元素0次或1次 |
| `{n}` | 匹配前面的元素n次 |
| `{n,}` | 匹配前面的元素至少n次 |
| `{n,m}` | 匹配前面的元素n到m次 |
| `[abc]` | 匹配方括号中的任意一个字符 |
| `[^abc]` | 匹配不在方括号中的任意字符 |
| `\d` | 匹配数字，等价于 `[0-9]` |
| `\w` | 匹配字母、数字、下划线，等价于 `[a-zA-Z0-9_]` |
| `\s` | 匹配空白字符（空格、制表符、换行符等） |
| `\D` | 匹配非数字字符 |
| `\W` | 匹配非字母、数字、下划线的字符 |
| `\S` | 匹配非空白字符 |

