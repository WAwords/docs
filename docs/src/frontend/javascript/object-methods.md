# JavaScript 对象常用方法

## 对象遍历方法

### Object.keys()

返回对象自身可枚举属性的键名数组。

```javascript
const obj = { a: 1, b: 2, c: 3 };
console.log(Object.keys(obj)); // ['a', 'b', 'c']
```

### Object.values()

返回对象自身可枚举属性的值数组。

```javascript
const obj = { a: 1, b: 2, c: 3 };
console.log(Object.values(obj)); // [1, 2, 3]
```

### Object.entries()

返回对象自身可枚举属性的键值对数组。

```javascript
const obj = { a: 1, b: 2, c: 3 };
console.log(Object.entries(obj)); // [['a', 1], ['b', 2], ['c', 3]]

// 遍历对象
Object.entries(obj).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});
```

## 对象创建与复制

### Object.assign()

将所有可枚举属性的值从一个或多个源对象复制到目标对象，返回目标对象。

```javascript
const target = { a: 1 };
const source = { b: 2, c: 3 };
const result = Object.assign(target, source);
console.log(result); // { a: 1, b: 2, c: 3 }
console.log(target); // { a: 1, b: 2, c: 3 } (目标对象被修改)

// 合并多个对象
const merged = Object.assign({}, { a: 1 }, { b: 2 }, { c: 3 });
console.log(merged); // { a: 1, b: 2, c: 3 }
```

### Object.create()

使用现有对象作为原型创建一个新对象。

```javascript
const proto = {
  greet() {
    console.log('Hello!');
  }
};

const obj = Object.create(proto);
obj.greet(); // Hello!

// 创建没有原型的对象
const nullObj = Object.create(null);
console.log(nullObj.toString); // undefined
```

### 展开运算符 (...)

ES6 提供的浅拷贝方式，更简洁。

```javascript
const obj = { a: 1, b: 2 };
const copy = { ...obj, c: 3 };
console.log(copy); // { a: 1, b: 2, c: 3 }

// 合并对象（后面的属性会覆盖前面的）
const merged = { a: 1, ...{ b: 2 }, a: 3 };
console.log(merged); // { a: 3, b: 2 }
```

## 对象属性描述

### Object.getOwnPropertyDescriptor()

获取对象自身属性的属性描述符。

```javascript
const obj = { a: 1 };
const descriptor = Object.getOwnPropertyDescriptor(obj, 'a');
console.log(descriptor);
// { value: 1, writable: true, enumerable: true, configurable: true }
```

### Object.getOwnPropertyDescriptors()

获取对象所有自身属性的属性描述符。

```javascript
const obj = { a: 1, b: 2 };
const descriptors = Object.getOwnPropertyDescriptors(obj);
console.log(descriptors);
// {
//   a: { value: 1, writable: true, enumerable: true, configurable: true },
//   b: { value: 2, writable: true, enumerable: true, configurable: true }
// }
```

### Object.defineProperty()

在对象上定义一个新属性，或修改现有属性。

```javascript
const obj = {};

Object.defineProperty(obj, 'a', {
  value: 1,
  writable: false,      // 不可写
  enumerable: true,     // 可枚举
  configurable: false   // 不可配置
});

obj.a = 2; // 修改无效（严格模式下会报错）
console.log(obj.a); // 1
```

### Object.defineProperties()

一次定义或修改多个属性。

```javascript
const obj = {};

Object.defineProperties(obj, {
  a: {
    value: 1,
    writable: true
  },
  b: {
    value: 2,
    writable: false
  }
});

console.log(obj); // { a: 1, b: 2 }
```

## 对象冻结与密封

### Object.freeze()

冻结对象，使其不能添加、删除或修改属性。

```javascript
const obj = { a: 1 };
Object.freeze(obj);

obj.a = 2;      // 修改无效
obj.b = 2;      // 添加无效
delete obj.a;   // 删除无效

console.log(obj); // { a: 1 }
console.log(Object.isFrozen(obj)); // true
```

### Object.seal()

密封对象，使其不能添加或删除属性，但可以修改现有属性。

```javascript
const obj = { a: 1 };
Object.seal(obj);

obj.a = 2;      // 修改有效
obj.b = 2;      // 添加无效
delete obj.a;   // 删除无效

console.log(obj); // { a: 2 }
console.log(Object.isSealed(obj)); // true
```

### Object.preventExtensions()

阻止对象扩展，使其不能添加新属性。

```javascript
const obj = { a: 1 };
Object.preventExtensions(obj);

obj.b = 2;      // 添加无效
obj.a = 2;      // 修改有效
delete obj.a;   // 删除有效

console.log(obj); // {}
console.log(Object.isExtensible(obj)); // false
```

## 对象属性查询

### hasOwnProperty()

判断对象自身（非继承）是否具有指定属性。

```javascript
const obj = { a: 1 };

console.log(obj.hasOwnProperty('a')); // true
console.log(obj.hasOwnProperty('toString')); // false

// 推荐使用 Object.hasOwn() (ES2022)
console.log(Object.hasOwn(obj, 'a')); // true
```

### in 操作符

判断对象及其原型链上是否具有指定属性。

```javascript
const obj = { a: 1 };

console.log('a' in obj);           // true
console.log('toString' in obj);    // true (继承自原型)
```

### Object.getOwnPropertyNames()

返回对象自身所有属性的键名数组（包括不可枚举属性）。

```javascript
const obj = { a: 1 };
Object.defineProperty(obj, 'b', {
  value: 2,
  enumerable: false
});

console.log(Object.keys(obj));                      // ['a']
console.log(Object.getOwnPropertyNames(obj));       // ['a', 'b']
```

### Object.getPrototypeOf()

获取对象的原型。

```javascript
const obj = {};
const proto = Object.getPrototypeOf(obj);
console.log(proto === Object.prototype); // true
```

### Object.setPrototypeOf()

设置对象的原型。

```javascript
const obj = {};
const proto = { greet() { console.log('Hello!'); } };

Object.setPrototypeOf(obj, proto);
obj.greet(); // Hello!
```

## 对象判断方法

### Object.is()

判断两个值是否相同（比 === 更精确）。

```javascript
console.log(Object.is(NaN, NaN));      // true (=== 为 false)
console.log(Object.is(-0, 0));         // false (=== 为 true)
console.log(Object.is(1, 1));          // true
console.log(Object.is('a', 'a'));      // true
```

### instanceof 操作符

判断对象是否是某个构造函数的实例。

```javascript
const arr = [1, 2, 3];
console.log(arr instanceof Array);   // true
console.log(arr instanceof Object);  // true

class MyClass {}
const obj = new MyClass();
console.log(obj instanceof MyClass); // true
```

## 对象转换方法

### Object.prototype.toString()

返回对象的字符串表示，可用于类型判断。

```javascript
const toString = Object.prototype.toString;

console.log(toString.call([]));        // '[object Array]'
console.log(toString.call({}));        // '[object Object]'
console.log(toString.call(null));      // '[object Null]'
console.log(toString.call(undefined)); // '[object Undefined]'
console.log(toString.call(123));       // '[object Number]'
console.log(toString.call('abc'));     // '[object String]'
```

### Object.prototype.valueOf()

返回对象的原始值。

```javascript
const obj = { a: 1 };
console.log(obj.valueOf()); // { a: 1 }

const num = new Number(123);
console.log(num.valueOf()); // 123
```

### Object.prototype.toLocaleString()

返回对象的本地化字符串表示。

```javascript
const date = new Date();
console.log(date.toLocaleString()); // 2024/1/1 00:00:00 (根据本地时区)

const num = 123456.789;
console.log(num.toLocaleString()); // 123,456.789 (根据本地格式)
```

## 实用技巧

### 深拷贝

使用 `JSON.parse(JSON.stringify())` 实现简单深拷贝（有局限性）。

```javascript
const obj = { a: 1, b: { c: 2 } };
const deepCopy = JSON.parse(JSON.stringify(obj));

deepCopy.b.c = 3;
console.log(obj.b.c);      // 2（原对象未被修改）
console.log(deepCopy.b.c); // 3
```

::: warning
此方法无法处理函数、undefined、Symbol、循环引用等情况。
:::

### 对象属性默认值

使用解构赋值设置默认值。

```javascript
const obj = { a: 1 };
const { a, b = 2 } = obj;
console.log(a, b); // 1 2
```

### 动态属性名

使用计算属性名创建动态键。

```javascript
const key = 'name';
const obj = {
  [key]: 'Tom',
  [`${key}Age`]: 20
};

console.log(obj); // { name: 'Tom', nameAge: 20 }
```

### 对象属性计数

```javascript
const obj = { a: 1, b: 2, c: 3 };
const count = Object.keys(obj).length;
console.log(count); // 3
```

### 判断对象是否为空

```javascript
const isEmpty = (obj) => Object.keys(obj).length === 0;

console.log(isEmpty({}));    // true
console.log(isEmpty({a:1})); // false
```
