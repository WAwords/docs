# ES6+ 常用语法特性

本文档整理 ES6 及后续版本常用的 JavaScript 语法特性，提升开发效率与代码质量。

## let 与 const

### 基本用法

```js
// let 声明块级作用域变量
let count = 0;
count = 1; // 可以重新赋值

// const 声明常量
const PI = 3.14159;
// PI = 3; // 错误：不能重新赋值

// const 声明的对象属性可以修改
const obj = { name: '张三' };
obj.name = '李四'; // 正确
```

### 变量提升与暂时性死区

```js
// var 存在变量提升
console.log(a); // undefined
var a = 1;

// let 和 const 不存在变量提升，存在暂时性死区
// console.log(b); // 报错：ReferenceError
let b = 2;
```

## 解构赋值

### 数组解构

```js
const arr = [1, 2, 3];

// 基本解构
const [a, b, c] = arr;
console.log(a, b, c); // 1 2 3

// 跳过元素
const [, , third] = arr;
console.log(third); // 3

// 剩余元素
const [first, ...rest] = arr;
console.log(rest); // [2, 3]

// 默认值
const [d = 0, e = 0] = [1];
console.log(d, e); // 1 0
```

### 对象解构

```js
const user = { name: '张三', age: 25 };

// 基本解构
const { name, age } = user;
console.log(name, age); // 张三 25

// 重命名
const { name: username } = user;
console.log(username); // 张三

// 默认值
const { gender = '未知' } = user;
console.log(gender); // 未知

// 嵌套解构
const data = { user: { info: { id: 1 } } };
const { user: { info: { id } } } = data;
console.log(id); // 1
```

### 函数参数解构

```js
function printUser({ name, age = 18 }) {
  console.log(name, age);
}

printUser({ name: '李四' }); // 李四 18
```

## 箭头函数

### 基本用法

```js
// 普通函数
const add = function (a, b) {
  return a + b;
};

// 箭头函数
const addArrow = (a, b) => a + b;

// 单参数可以省略括号
const double = x => x * 2;

// 多行语句需要花括号和 return
const multiply = (a, b) => {
  const result = a * b;
  return result;
};
```

### this 指向

```js
// 箭头函数没有自己的 this，继承外层作用域的 this
const obj = {
  name: '张三',
  sayHi: function () {
    setTimeout(() => {
      console.log(this.name); // 张三，this 指向 obj
    }, 1000);
  }
};

obj.sayHi();
```

::: warning 注意
箭头函数不能作为构造函数使用，也没有 arguments 对象。
:::

## 模板字符串

### 基本用法

```js
const name = '张三';
const age = 25;

// 模板字符串
const message = `我叫${name}，今年${age}岁`;
console.log(message); // 我叫张三，今年25岁

// 多行字符串
const html = `
  <div>
    <p>这是一段</p>
    <p>多行文本</p>
  </div>
`;
```

### 标签模板

```js
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ? `<mark>${values[i]}</mark>` : '');
  }, '');
}

const name = '张三';
const result = highlight`我叫${name}，你好！`;
console.log(result); // 我叫&lt;mark&gt;张三&lt;/mark&gt;，你好！
```

## 展开运算符与剩余参数

### 展开运算符

```js
// 数组展开
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const merged = [...arr1, ...arr2];
console.log(merged); // [1, 2, 3, 4, 5, 6]

// 对象展开
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const mergedObj = { ...obj1, ...obj2 };
console.log(mergedObj); // { a: 1, b: 3, c: 4 }

// 函数参数展开
function sum(a, b, c) {
  return a + b + c;
}
const nums = [1, 2, 3];
console.log(sum(...nums)); // 6
```

### 剩余参数

```js
function sumAll(...nums) {
  return nums.reduce((total, num) => total + num, 0);
}

console.log(sumAll(1, 2, 3, 4)); // 10
```

## Promise

### 基本用法

```js
// 创建 Promise
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: '成功' });
      // reject(new Error('失败'));
    }, 1000);
  });
};

// 使用 Promise
fetchData()
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log('完成'));
```

### Promise 静态方法

```js
// Promise.all - 全部成功才成功
Promise.all([promise1, promise2])
  .then(results => console.log(results));

// Promise.race - 最快的那个
Promise.race([promise1, promise2])
  .then(result => console.log(result));

// Promise.allSettled - 等待所有完成
Promise.allSettled([promise1, promise2])
  .then(results => console.log(results));

// Promise.any - 第一个成功的
Promise.any([promise1, promise2])
  .then(result => console.log(result));
```

## async/await

### 基本用法

```js
// async 函数返回 Promise
async function getData() {
  return '数据';
}

// 使用 await
async function fetchUser() {
  try {
    const response = await fetch('/api/user');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
```

### 并行执行

```js
async function fetchAll() {
  // 并行执行，等待全部完成
  const [user, posts] = await Promise.all([
    fetchUser(),
    fetchPosts()
  ]);
  return { user, posts };
}
```

## 数组新增方法

### forEach、map、filter、reduce

```js
const arr = [1, 2, 3, 4, 5];

// forEach - 遍历
arr.forEach(item => console.log(item));

// map - 映射
const doubled = arr.map(x => x * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter - 过滤
const even = arr.filter(x => x % 2 === 0);
console.log(even); // [2, 4]

// reduce - 累积
const sum = arr.reduce((total, x) => total + x, 0);
console.log(sum); // 15
```

### find、findIndex、includes

```js
const arr = [1, 2, 3, 4, 5];

// find - 查找元素
const found = arr.find(x => x > 3);
console.log(found); // 4

// findIndex - 查找索引
const index = arr.findIndex(x => x > 3);
console.log(index); // 3

// includes - 包含判断
console.log(arr.includes(3)); // true
```

## 对象新增方法

### Object.assign

```js
const target = { a: 1 };
const source = { b: 2, c: 3 };
const result = Object.assign(target, source);
console.log(result); // { a: 1, b: 2, c: 3 }
```

### Object.keys、Object.values、Object.entries

```js
const obj = { a: 1, b: 2, c: 3 };

// 键数组
console.log(Object.keys(obj)); // ['a', 'b', 'c']

// 值数组
console.log(Object.values(obj)); // [1, 2, 3]

// 键值对数组
console.log(Object.entries(obj)); // [['a', 1], ['b', 2], ['c', 3]]
```

### 可选链操作符 (?.)

```js
const user = { address: { city: '北京' } };

// 安全访问深层属性
const city = user?.address?.city;
console.log(city); // 北京

// 不存在的属性返回 undefined
const zip = user?.address?.zip;
console.log(zip); // undefined
```

### 空值合并操作符 (??)

```js
// 只在 null 或 undefined 时使用默认值
const value1 = null ?? '默认值';
console.log(value1); // 默认值

const value2 = 0 ?? '默认值';
console.log(value2); // 0

const value3 = '' ?? '默认值';
console.log(value3); // ''
```

## 类 (Class)

### 基本用法

```js
class Person {
  // 构造函数
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // 实例方法
  sayHi() {
    console.log(`我是${this.name}`);
  }

  // 静态方法
  static create(name) {
    return new Person(name, 18);
  }
}

const person = new Person('张三', 25);
person.sayHi(); // 我是张三

const person2 = Person.create('李四');
```

### 继承

```js
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age); // 调用父类构造函数
    this.grade = grade;
  }

  study() {
    console.log(`${this.name}在学习`);
  }
}

const student = new Student('王五', 18, '高三');
student.sayHi(); // 我是王五
student.study(); // 王五在学习
```

## 模块化

### 导出

```js
// 命名导出
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export class Calculator {
  // ...
}

// 默认导出
export default function() {
  return '默认导出';
}
```

### 导入

```js
// 命名导入
import { PI, add } from './math.js';

// 重命名导入
import { PI as pi } from './math.js';

// 默认导入
import myFunc from './math.js';

// 混合导入
import myFunc, { PI } from './math.js';

// 全部导入
import * as math from './math.js';
```

## Symbol

### 基本用法

```js
// 创建 Symbol
const sym1 = Symbol('description');
const sym2 = Symbol('description');

console.log(sym1 === sym2); // false，每个 Symbol 都是唯一的

// 作为对象属性
const obj = {
  [sym1]: 'value'
};
console.log(obj[sym1]); // value
```

## Set 和 Map

### Set

```js
// Set - 不重复的值集合
const set = new Set([1, 2, 2, 3]);
console.log(set); // Set(3) {1, 2, 3}

set.add(4);
set.delete(1);
console.log(set.has(2)); // true
console.log(set.size); // 3

// 数组去重
const arr = [1, 2, 2, 3];
const unique = [...new Set(arr)];
console.log(unique); // [1, 2, 3]
```

### Map

```js
// Map - 键值对集合
const map = new Map();
map.set('name', '张三');
map.set('age', 25);

console.log(map.get('name')); // 张三
console.log(map.has('age')); // true
console.log(map.size); // 2

map.delete('age');
map.clear();
```
