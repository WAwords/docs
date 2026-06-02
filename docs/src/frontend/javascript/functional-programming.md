# JavaScript 函数式编程入门

## 什么是函数式编程

函数式编程（Functional Programming，简称 FP）是一种编程范式，它将计算过程视为数学函数的求值过程，并避免使用状态和可变数据。

函数式编程的核心特点：
- 纯函数（Pure Functions）
- 函数作为一等公民（First-Class Functions）
- 不可变数据（Immutable Data）
- 函数组合（Function Composition）
- 避免副作用（Side Effects）

## 纯函数

### 定义

纯函数是满足以下两个条件的函数：
1. 相同的输入总是产生相同的输出
2. 没有副作用（不修改外部状态、不修改输入参数、不执行 I/O 操作等）

### 示例

```javascript
// 纯函数示例
function add(a, b) {
  return a + b;
}

console.log(add(1, 2)); // 3
console.log(add(1, 2)); // 3，相同输入总是相同输出

// 非纯函数示例（有副作用）
let count = 0;
function increment() {
  count++; // 修改外部状态
  return count;
}

console.log(increment()); // 1
console.log(increment()); // 2，相同输入不同输出
```

## 函数作为一等公民

在 JavaScript 中，函数是一等公民，意味着：
- 函数可以赋值给变量
- 函数可以作为参数传递
- 函数可以作为返回值

### 函数赋值给变量

```javascript
const greet = function(name) {
  return `你好，${name}`;
};

console.log(greet('张三')); // 你好，张三
```

### 函数作为参数

```javascript
function applyOperation(num, operation) {
  return operation(num);
}

const double = function(x) {
  return x * 2;
};

console.log(applyOperation(5, double)); // 10
```

### 函数作为返回值

```javascript
function createMultiplier(factor) {
  return function(x) {
    return x * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

## 高阶函数

高阶函数是指满足以下任一条件的函数：
- 接受一个或多个函数作为参数
- 返回一个函数作为结果

### 常见高阶函数示例

```javascript
// map - 映射数组
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => x * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter - 过滤数组
const evens = numbers.filter(x => x % 2 === 0);
console.log(evens); // [2, 4]

// reduce - 归约数组
const sum = numbers.reduce((acc, cur) => acc + cur, 0);
console.log(sum); // 15
```

## 函数组合

函数组合是将多个函数组合成一个新函数的过程。

```javascript
// 简单的函数组合
function compose(f, g) {
  return function(x) {
    return f(g(x));
  };
}

const add2 = x => x + 2;
const multiply3 = x => x * 3;

const add2ThenMultiply3 = compose(multiply3, add2);
console.log(add2ThenMultiply3(5)); // (5 + 2) * 3 = 21

// 多函数组合
function composeAll(...fns) {
  return function(x) {
    return fns.reduceRight((acc, fn) => fn(acc), x);
  };
}

const subtract1 = x => x - 1;
const result = composeAll(multiply3, add2, subtract1);
console.log(result(5)); // ((5 - 1) + 2) * 3 = 18
```

## 柯里化（Currying）

柯里化是将一个接受多个参数的函数转换为一系列接受单个参数的函数的过程。

```javascript
// 普通函数
function add(a, b, c) {
  return a + b + c;
}

// 柯里化版本
function curryAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

console.log(curryAdd(1)(2)(3)); // 6

// 通用柯里化函数
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...moreArgs) {
        return curried.apply(this, args.concat(moreArgs));
      };
    }
  };
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
```

## 不可变数据

在函数式编程中，我们尽量避免修改数据，而是创建新的数据副本。

```javascript
// 错误：直接修改数组
const arr = [1, 2, 3];
arr.push(4); // 修改了原数组
console.log(arr); // [1, 2, 3, 4]

// 正确：创建新数组
const newArr = [...arr, 5];
console.log(arr); // [1, 2, 3, 4] - 原数组未变
console.log(newArr); // [1, 2, 3, 4, 5]

// 对象同理
const obj = { a: 1, b: 2 };
const newObj = { ...obj, b: 3 };
console.log(obj); // { a: 1, b: 2 }
console.log(newObj); // { a: 1, b: 3 }
```

## 实际应用示例

### 数据处理管道

```javascript
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const result = data
  .filter(x => x % 2 === 0) // 筛选偶数
  .map(x => x * 2) // 每个数乘以 2
  .reduce((acc, cur) => acc + cur, 0); // 求和

console.log(result); // (2 + 4 + 6 + 8 + 10) * 2 = 60
```

## 总结

函数式编程是一种强大的编程范式，它通过强调纯函数、不可变数据和函数组合来提高代码的可读性、可维护性和可测试性。虽然不是所有场景都适合使用函数式编程，但掌握这些概念可以让你成为更好的 JavaScript 开发者。
