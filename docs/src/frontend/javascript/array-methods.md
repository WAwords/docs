# JavaScript 数组常用方法

## 数组遍历方法

### forEach()

遍历数组的每个元素，没有返回值。

```javascript
const arr = [1, 2, 3, 4, 5];
arr.forEach((item, index, array) => {
  console.log(item, index);
});
```

### map()

遍历数组并返回一个新数组，新数组的元素是原数组元素经过处理后的结果。

```javascript
const arr = [1, 2, 3, 4, 5];
const newArr = arr.map(item => item * 2);
console.log(newArr); // [2, 4, 6, 8, 10]
```

### filter()

筛选数组中符合条件的元素，返回一个新数组。

```javascript
const arr = [1, 2, 3, 4, 5];
const newArr = arr.filter(item => item > 2);
console.log(newArr); // [3, 4, 5]
```

### reduce()

对数组中的所有元素执行一个归约操作，返回一个单一的值。

```javascript
const arr = [1, 2, 3, 4, 5];
const sum = arr.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);
console.log(sum); // 15
```

### reduceRight()

与 reduce() 类似，但从右向左遍历数组。

```javascript
const arr = ['a', 'b', 'c', 'd'];
const result = arr.reduceRight((acc, cur) => acc + cur);
console.log(result); // dcba
```

## 数组查找方法

### find()

查找数组中第一个符合条件的元素，返回该元素，未找到则返回 undefined。

```javascript
const arr = [1, 2, 3, 4, 5];
const found = arr.find(item => item > 2);
console.log(found); // 3
```

### findIndex()

查找数组中第一个符合条件的元素的索引，返回该索引，未找到则返回 -1。

```javascript
const arr = [1, 2, 3, 4, 5];
const index = arr.findIndex(item => item > 2);
console.log(index); // 2
```

### includes()

判断数组是否包含某个指定的值，返回布尔值。

```javascript
const arr = [1, 2, 3, 4, 5];
console.log(arr.includes(3)); // true
console.log(arr.includes(6)); // false
```

### indexOf()

查找数组中某个指定值的第一个索引，未找到则返回 -1。

```javascript
const arr = [1, 2, 3, 2, 1];
console.log(arr.indexOf(2)); // 1
```

### lastIndexOf()

查找数组中某个指定值的最后一个索引，未找到则返回 -1。

```javascript
const arr = [1, 2, 3, 2, 1];
console.log(arr.lastIndexOf(2)); // 3
```

## 数组判断方法

### some()

判断数组中是否至少有一个元素符合条件，返回布尔值。

```javascript
const arr = [1, 2, 3, 4, 5];
console.log(arr.some(item => item > 4)); // true
```

### every()

判断数组中是否所有元素都符合条件，返回布尔值。

```javascript
const arr = [1, 2, 3, 4, 5];
console.log(arr.every(item => item > 0)); // true
console.log(arr.every(item => item > 2)); // false
```

## 数组操作方法

### push()

向数组末尾添加一个或多个元素，返回新数组的长度。

```javascript
const arr = [1, 2, 3];
arr.push(4, 5);
console.log(arr); // [1, 2, 3, 4, 5]
```

### pop()

删除数组末尾的元素，返回被删除的元素。

```javascript
const arr = [1, 2, 3, 4, 5];
const lastItem = arr.pop();
console.log(lastItem); // 5
console.log(arr); // [1, 2, 3, 4]
```

### unshift()

向数组开头添加一个或多个元素，返回新数组的长度。

```javascript
const arr = [1, 2, 3];
arr.unshift(-1, 0);
console.log(arr); // [-1, 0, 1, 2, 3]
```

### shift()

删除数组开头的元素，返回被删除的元素。

```javascript
const arr = [1, 2, 3, 4, 5];
const firstItem = arr.shift();
console.log(firstItem); // 1
console.log(arr); // [2, 3, 4, 5]
```

### splice()

从数组中添加/删除项目，返回被删除的项目。

```javascript
const arr = [1, 2, 3, 4, 5];
// 删除从索引 2 开始的 2 个元素
const removed = arr.splice(2, 2);
console.log(removed); // [3, 4]
console.log(arr); // [1, 2, 5]

// 在索引 2 插入元素
arr.splice(2, 0, 3, 4);
console.log(arr); // [1, 2, 3, 4, 5]

// 替换元素
arr.splice(2, 2, 'a', 'b');
console.log(arr); // [1, 2, 'a', 'b', 5]
```

### slice()

提取数组的一部分，返回一个新数组，不改变原数组。

```javascript
const arr = [1, 2, 3, 4, 5];
console.log(arr.slice(1, 4)); // [2, 3, 4]
console.log(arr.slice(2)); // [3, 4, 5]
console.log(arr.slice()); // [1, 2, 3, 4, 5]
```

### concat()

连接两个或多个数组，返回一个新数组，不改变原数组。

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const newArr = arr1.concat(arr2);
console.log(newArr); // [1, 2, 3, 4, 5, 6]
```

### join()

将数组的所有元素连接成一个字符串。

```javascript
const arr = ['a', 'b', 'c', 'd'];
console.log(arr.join('-')); // a-b-c-d
console.log(arr.join('')); // abcd
```

## 数组排序方法

### sort()

对数组元素进行排序，默认按 Unicode 编码排序，会改变原数组。

```javascript
const arr = [3, 1, 4, 1, 5, 9, 2, 6];
// 升序排序
arr.sort((a, b) => a - b);
console.log(arr); // [1, 1, 2, 3, 4, 5, 6, 9]

// 降序排序
arr.sort((a, b) => b - a);
console.log(arr); // [9, 6, 5, 4, 3, 2, 1, 1]

// 字符串排序
const strArr = ['banana', 'apple', 'cherry'];
strArr.sort();
console.log(strArr); // ['apple', 'banana', 'cherry']
```

### reverse()

颠倒数组中元素的顺序，会改变原数组。

```javascript
const arr = [1, 2, 3, 4, 5];
arr.reverse();
console.log(arr); // [5, 4, 3, 2, 1]
```

## 数组转换方法

### Array.from()

从一个类似数组或可迭代对象创建一个新的数组实例。

```javascript
// 从字符串创建数组
console.log(Array.from('hello')); // ['h', 'e', 'l', 'l', 'o']

// 从 Set 创建数组
const set = new Set([1, 2, 3, 3, 4]);
console.log(Array.from(set)); // [1, 2, 3, 4]

// 使用映射函数
console.log(Array.from([1, 2, 3], x => x * 2)); // [2, 4, 6]
```

### Array.isArray()

判断一个值是否是数组，返回布尔值。

```javascript
console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray('hello')); // false
```

## 数组填充方法

### fill()

用一个固定值填充数组中从起始索引到终止索引内的全部元素。

```javascript
const arr = [1, 2, 3, 4, 5];
arr.fill(0, 1, 4);
console.log(arr); // [1, 0, 0, 0, 5]
```

### flat()

按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组。

```javascript
const arr = [1, [2, [3, [4]]]];
console.log(arr.flat()); // [1, 2, [3, [4]]]
console.log(arr.flat(2)); // [1, 2, 3, [4]]
console.log(arr.flat(Infinity)); // [1, 2, 3, 4]
```

### flatMap()

首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。

```javascript
const arr = [1, 2, 3];
console.log(arr.flatMap(x => [x, x * 2])); // [1, 2, 2, 4, 3, 6]
```
