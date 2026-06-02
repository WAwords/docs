# JavaScript 字符串常用方法

## 字符串访问与获取

### charAt()
返回字符串中指定位置的字符。

```javascript
const str = 'Hello World';
console.log(str.charAt(0)); // H
console.log(str.charAt(4)); // o
```

### charCodeAt()
返回字符串中指定位置字符的 Unicode 编码。

```javascript
const str = 'Hello World';
console.log(str.charCodeAt(0)); // 72
console.log(str.charCodeAt(4)); // 111
```

### at()
返回字符串中指定位置的字符，支持负数索引。

```javascript
const str = 'Hello World';
console.log(str.at(0)); // H
console.log(str.at(-1)); // d
```

### [] 方括号访问
使用方括号访问字符串中指定位置的字符。

```javascript
const str = 'Hello World';
console.log(str[0]); // H
console.log(str[4]); // o
```

## 字符串查找方法

### indexOf()
返回指定字符在字符串中首次出现的索引，未找到则返回 -1。

```javascript
const str = 'Hello World';
console.log(str.indexOf('o')); // 4
console.log(str.indexOf('z')); // -1
```

### lastIndexOf()
返回指定字符在字符串中最后出现的索引，未找到则返回 -1。

```javascript
const str = 'Hello World';
console.log(str.lastIndexOf('o')); // 7
console.log(str.lastIndexOf('z')); // -1
```

### includes()
判断字符串是否包含指定的字符，返回布尔值。

```javascript
const str = 'Hello World';
console.log(str.includes('World')); // true
console.log(str.includes('abc')); // false
```

### startsWith()
判断字符串是否以指定字符开头，返回布尔值。

```javascript
const str = 'Hello World';
console.log(str.startsWith('Hello')); // true
console.log(str.startsWith('World')); // false
```

### endsWith()
判断字符串是否以指定字符结尾，返回布尔值。

```javascript
const str = 'Hello World';
console.log(str.endsWith('World')); // true
console.log(str.endsWith('Hello')); // false
```

### search()
使用正则表达式查找，返回首次匹配的索引，未找到则返回 -1。

```javascript
const str = 'Hello World';
console.log(str.search(/World/)); // 6
console.log(str.search(/world/i)); // 6 (忽略大小写)
```

### match()
使用正则表达式查找匹配项，返回匹配结果的数组。

```javascript
const str = 'Hello World Hello';
console.log(str.match(/Hello/g)); // ['Hello', 'Hello']
console.log(str.match(/Hello/)); // ['Hello', index: 0, input: 'Hello World Hello']
```

### matchAll()
使用正则表达式查找所有匹配项，返回包含所有匹配结果的迭代器。

```javascript
const str = 'Hello World Hello';
const matches = str.matchAll(/Hello/g);
for (const match of matches) {
  console.log(match);
}
```

## 字符串截取方法

### substring()
提取字符串中介于两个索引之间的字符。

```javascript
const str = 'Hello World';
console.log(str.substring(0, 5)); // Hello
console.log(str.substring(6)); // World
```

### slice()
提取字符串的一部分，支持负数索引。

```javascript
const str = 'Hello World';
console.log(str.slice(0, 5)); // Hello
console.log(str.slice(-5)); // World
console.log(str.slice(6, -1)); // Worl
```

### substr()
从指定索引开始，提取指定长度的字符。

```javascript
const str = 'Hello World';
console.log(str.substr(0, 5)); // Hello
console.log(str.substr(6, 5)); // World
```

## 字符串操作方法

### concat()
连接两个或多个字符串，返回新字符串。

```javascript
const str1 = 'Hello';
const str2 = 'World';
console.log(str1.concat(' ', str2)); // Hello World
```

### split()
将字符串分割为数组。

```javascript
const str = 'Hello World';
console.log(str.split(' ')); // ['Hello', 'World']
console.log(str.split('')); // ['H', 'e', 'l', 'l', 'o', ' ', 'W', 'o', 'r', 'l', 'd']
```

### join()
将数组元素连接为字符串（注：这是数组方法）。

```javascript
const arr = ['Hello', 'World'];
console.log(arr.join(' ')); // Hello World
console.log(arr.join('-')); // Hello-World
```

### repeat()
将字符串重复指定次数。

```javascript
const str = 'Hello';
console.log(str.repeat(3)); // HelloHelloHello
```

### padStart()
在字符串开头填充指定字符，使字符串达到指定长度。

```javascript
const str = '5';
console.log(str.padStart(2, '0')); // 05
console.log(str.padStart(4, 'x')); // xxx5
```

### padEnd()
在字符串末尾填充指定字符，使字符串达到指定长度。

```javascript
const str = '5';
console.log(str.padEnd(2, '0')); // 50
console.log(str.padEnd(4, 'x')); // 5xxx
```

### trim()
去除字符串开头和结尾的空格。

```javascript
const str = '  Hello World  ';
console.log(str.trim()); // Hello World
```

### trimStart() / trimLeft()
去除字符串开头的空格。

```javascript
const str = '  Hello World  ';
console.log(str.trimStart()); // Hello World  
```

### trimEnd() / trimRight()
去除字符串结尾的空格。

```javascript
const str = '  Hello World  ';
console.log(str.trimEnd()); //   Hello World
```

### replace()
替换字符串中匹配的字符。

```javascript
const str = 'Hello World';
console.log(str.replace('World', 'JavaScript')); // Hello JavaScript
console.log(str.replace(/o/g, '0')); // Hell0 W0rld
```

### replaceAll()
替换字符串中所有匹配的字符。

```javascript
const str = 'Hello World Hello';
console.log(str.replaceAll('Hello', 'Hi')); // Hi World Hi
```

## 字符串大小写转换

### toLowerCase()
将字符串转换为小写。

```javascript
const str = 'Hello World';
console.log(str.toLowerCase()); // hello world
```

### toUpperCase()
将字符串转换为大写。

```javascript
const str = 'Hello World';
console.log(str.toUpperCase()); // HELLO WORLD
```

## 字符串比较

### localeCompare()
比较两个字符串，返回一个数字表示比较结果。

```javascript
const str1 = 'apple';
const str2 = 'banana';
console.log(str1.localeCompare(str2)); // -1 (str1 在 str2 之前)
console.log(str2.localeCompare(str1)); // 1 (str2 在 str1 之后)
console.log(str1.localeCompare('apple')); // 0 (相等)
```

## 字符串转换

### toString()
将值转换为字符串。

```javascript
const num = 123;
console.log(num.toString()); // 123
```

### String()
将值转换为字符串。

```javascript
const num = 123;
console.log(String(num)); // 123
const bool = true;
console.log(String(bool)); // true
```

## 模板字符串

### 基本用法
使用反引号（\`）定义模板字符串，可以包含多行文本和插值表达式。

```javascript
const name = 'World';
const str = `Hello ${name}`;
console.log(str); // Hello World

const multiLine = `
  第一行
  第二行
  第三行
`;
console.log(multiLine);
```

### 标签模板
带标签的模板字符串。

```javascript
function tag(strings, ...values) {
  console.log(strings); // ['Hello ', '!']
  console.log(values); // ['World']
  return strings[0] + values[0] + strings[1];
}
const name = 'World';
const result = tag`Hello ${name}!`;
console.log(result); // Hello World!
```

## 常用操作示例

### 反转字符串

```javascript
function reverseString(str) {
  return str.split('').reverse().join('');
}
console.log(reverseString('Hello')); // olleH
```

### 检查是否为回文字符串

```javascript
function isPalindrome(str) {
  const reversed = str.split('').reverse().join('');
  return str === reversed;
}
console.log(isPalindrome('radar')); // true
console.log(isPalindrome('hello')); // false
```

### 首字母大写

```javascript
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
console.log(capitalize('hello')); // Hello
```

### 单词首字母大写

```javascript
function capitalizeWords(str) {
  return str.split(' ').map(word => capitalize(word)).join(' ');
}
console.log(capitalizeWords('hello world')); // Hello World
```

### 统计字符出现次数

```javascript
function countChar(str, char) {
  let count = 0;
  for (const c of str) {
    if (c === char) count++;
  }
  return count;
}
console.log(countChar('Hello World', 'l')); // 3
```
