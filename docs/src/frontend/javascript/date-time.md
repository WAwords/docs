# JavaScript 日期时间处理

## Date 对象基础

### 创建 Date 对象

```javascript
// 当前时间
const now = new Date();

// 通过字符串创建
const date1 = new Date('2024-01-01');
const date2 = new Date('2024-01-01 12:00:00');

// 通过年、月、日、时、分、秒、毫秒创建（月份从 0 开始）
const date3 = new Date(2024, 0, 1); // 2024年1月1日
const date4 = new Date(2024, 0, 1, 12, 30, 45);

// 通过时间戳创建
const date5 = new Date(1704067200000);
```

### 获取日期时间信息

```javascript
const date = new Date();

date.getFullYear(); // 年份
date.getMonth(); // 月份（0-11）
date.getDate(); // 日期（1-31）
date.getDay(); // 星期几（0-6，0 是周日）
date.getHours(); // 小时（0-23）
date.getMinutes(); // 分钟（0-59）
date.getSeconds(); // 秒（0-59）
date.getMilliseconds(); // 毫秒（0-999）
date.getTime(); // 时间戳（毫秒）
```

### 设置日期时间信息

```javascript
const date = new Date();

date.setFullYear(2025);
date.setMonth(11); // 12月
date.setDate(31);
date.setHours(23);
date.setMinutes(59);
date.setSeconds(59);
date.setMilliseconds(999);
```

## 日期格式化

### 自定义格式化函数

```javascript
/**
 * 格式化日期
 * @param {Date} date 日期对象
 * @param {string} format 格式化模板
 * @returns {string} 格式化后的字符串
 */
function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

const date = new Date();
console.log(formatDate(date)); // 2024-01-01 12:30:45
console.log(formatDate(date, 'YYYY年MM月DD日')); // 2024年01月01日
```

### 内置格式化方法

```javascript
const date = new Date();

date.toDateString(); // Tue Jan 01 2024
date.toTimeString(); // 12:30:45 GMT+0800 (中国标准时间)
date.toLocaleDateString(); // 2024/1/1
date.toLocaleTimeString(); // 12:30:45
date.toLocaleString(); // 2024/1/1 12:30:45
date.toISOString(); // 2024-01-01T04:30:45.000Z
```

## 日期计算

### 时间差计算

```javascript
const date1 = new Date('2024-01-01');
const date2 = new Date('2024-02-01');

// 计算天数差
const diffTime = Math.abs(date2 - date1);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
console.log(diffDays); // 31
```

### 日期加减

```javascript
const date = new Date();

// 加 1 天
date.setDate(date.getDate() + 1);

// 减 1 周
date.setDate(date.getDate() - 7);

// 加 1 个月
date.setMonth(date.getMonth() + 1);

// 加 1 年
date.setFullYear(date.getFullYear() + 1);
```

### 获取特定日期

```javascript
/**
 * 获取当月第一天
 */
function getFirstDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

/**
 * 获取当月最后一天
 */
function getLastDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

/**
 * 获取当周周一
 */
function getMonday(date) {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
}

/**
 * 获取当周周日
 */
function getSunday(date) {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? 0 : 7);
  return new Date(date.setDate(diff));
}
```

## 常用工具函数

### 判断是否为闰年

```javascript
/**
 * 判断是否为闰年
 * @param {number} year 年份
 * @returns {boolean}
 */
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

console.log(isLeapYear(2024)); // true
console.log(isLeapYear(2023)); // false
```

### 获取月份天数

```javascript
/**
 * 获取指定月份的天数
 * @param {number} year 年份
 * @param {number} month 月份（1-12）
 * @returns {number}
 */
function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

console.log(getDaysInMonth(2024, 2)); // 29
console.log(getDaysInMonth(2024, 4)); // 30
```

### 相对时间显示

```javascript
/**
 * 获取相对时间描述
 * @param {Date} date 日期对象
 * @returns {string}
 */
function getRelativeTime(date) {
  const now = new Date();
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return '刚刚';
  if (minutes < 60) return `${minutes}分钟前`;
  if (hours < 24) return `${hours}小时前`;
  if (days < 30) return `${days}天前`;
  if (days < 365) return `${Math.floor(days / 30)}个月前`;
  return `${Math.floor(days / 365)}年前`;
}
```

## 时区处理

### 获取时区偏移

```javascript
const date = new Date();
date.getTimezoneOffset(); // 时区偏移，单位分钟（负值表示东时区）
```

### 转换为本地时间

```javascript
const date = new Date('2024-01-01T12:00:00Z');
console.log(date.toLocaleString()); // 本地时间
```

## 性能优化

### 避免频繁创建 Date 对象

```javascript
// 不好的做法
for (let i = 0; i < 1000; i++) {
  const date = new Date();
  // ...
}

// 好的做法
const date = new Date();
for (let i = 0; i < 1000; i++) {
  // 使用同一个 date 对象
  // ...
}
```

### 使用时间戳进行比较

```javascript
const date1 = new Date();
const date2 = new Date();

// 直接比较
console.log(date1 > date2);

// 使用时间戳比较（性能更好）
console.log(date1.getTime() > date2.getTime());
```
