
# TypeScript 类型体操

本文档整理了 TypeScript 中常用的类型体操技巧和实用工具类型。

## 基本工具类型

### Partial
将对象的所有属性变为可选。

```typescript
type Partial&lt;T&gt; = {
  [P in keyof T]?: T[P];
};

// 使用示例
interface User {
  name: string;
  age: number;
}

type PartialUser = Partial&lt;User&gt;;
// { name?: string; age?: number; }
```

### Required
将对象的所有属性变为必需。

```typescript
type Required&lt;T&gt; = {
  [P in keyof T]-?: T[P];
};

// 使用示例
interface OptionalUser {
  name?: string;
  age?: number;
}

type RequiredUser = Required&lt;OptionalUser&gt;;
// { name: string; age: number; }
```

### Readonly
将对象的所有属性变为只读。

```typescript
type Readonly&lt;T&gt; = {
  readonly [P in keyof T]: T[P];
};

// 使用示例
interface MutableUser {
  name: string;
}

type ImmutableUser = Readonly&lt;MutableUser&gt;;
// { readonly name: string; }
```

### Record
构造一个对象类型，其键类型为 K，值类型为 T。

```typescript
type Record&lt;K extends keyof any, T&gt; = {
  [P in K]: T;
};

// 使用示例
type UserMap = Record&lt;string, User&gt;;
// { [key: string]: User; }
```

### Pick
从对象中选取指定的属性。

```typescript
type Pick&lt;T, K extends keyof T&gt; = {
  [P in K]: T[P];
};

// 使用示例
interface User {
  name: string;
  age: number;
  email: string;
}

type UserName = Pick&lt;User, 'name'&gt;;
// { name: string; }
```

### Omit
从对象中排除指定的属性。

```typescript
type Omit&lt;T, K extends keyof any&gt; = Pick&lt;T, Exclude&lt;keyof T, K&gt;&gt;;

// 使用示例
type UserWithoutEmail = Omit&lt;User, 'email'&gt;;
// { name: string; age: number; }
```

### Exclude
从类型 T 中排除可以赋值给 U 的类型。

```typescript
type Exclude&lt;T, U&gt; = T extends U ? never : T;

// 使用示例
type T0 = Exclude&lt;'a' | 'b' | 'c', 'a'&gt;;
// 'b' | 'c'
```

### Extract
从类型 T 中提取可以赋值给 U 的类型。

```typescript
type Extract&lt;T, U&gt; = T extends U ? T : never;

// 使用示例
type T0 = Extract&lt;'a' | 'b' | 'c', 'a' | 'f'&gt;;
// 'a'
```

### ReturnType
获取函数的返回类型。

```typescript
type ReturnType&lt;T extends (...args: any) =&gt; any&gt; = T extends (...args: any) =&gt; infer R ? R : any;

// 使用示例
function foo(): string {
  return 'hello';
}

type FooReturnType = ReturnType&lt;typeof foo&gt;;
// string
```

### Parameters
获取函数的参数类型元组。

```typescript
type Parameters&lt;T extends (...args: any) =&gt; any&gt; = T extends (...args: infer P) =&gt; any ? P : never;

// 使用示例
function bar(a: number, b: string): void {}

type BarParams = Parameters&lt;typeof bar&gt;;
// [number, string]
```

## 高级类型体操

### 深度 Readonly
递归地将对象的所有属性变为只读。

```typescript
type DeepReadonly&lt;T&gt; = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly&lt;T[P]&gt; : T[P];
};

// 使用示例
interface NestedObject {
  a: {
    b: string;
  };
}

type DeepImmutable = DeepReadonly&lt;NestedObject&gt;;
```

### 函数参数类型化
获取函数的第 N 个参数类型。

```typescript
type NthParameter&lt;T extends (...args: any) =&gt; any, N extends number&gt; = Parameters&lt;T&gt;[N];

// 使用示例
function baz(x: number, y: string, z: boolean): void {}

type SecondParam = NthParameter&lt;typeof baz, 1&gt;;
// string
```

### 元组转联合类型
将元组类型转换为联合类型。

```typescript
type TupleToUnion&lt;T extends any[]&gt; = T[number];

// 使用示例
type Tuple = [number, string, boolean];
type Union = TupleToUnion&lt;Tuple&gt;;
// number | string | boolean
```

### 获取数组元素类型
从数组类型中提取元素类型。

```typescript
type ArrayElement&lt;T extends any[]&gt; = T extends (infer U)[] ? U : never;

// 使用示例
type Numbers = number[];
type NumberElement = ArrayElement&lt;Numbers&gt;;
// number
```

### 字符串字面量类型分割
将字符串按分隔符分割成元组。

```typescript
type Split&lt;S extends string, D extends string&gt; = 
  S extends `${infer T}${D}${infer U}` ? [T, ...Split&lt;U, D&gt;] : [S];

// 使用示例
type Path = Split&lt;'a/b/c', '/'&gt;;
// ['a', 'b', 'c']
```

### 字符串大写/小写
将字符串字面量类型转换为大写或小写。

```typescript
// TypeScript 4.1+ 内置了这些类型
type Uppercase&lt;S extends string&gt; = intrinsic;
type Lowercase&lt;S extends string&gt; = intrinsic;
type Capitalize&lt;S extends string&gt; = intrinsic;
type Uncapitalize&lt;S extends string&gt; = intrinsic;

// 使用示例
type Hello = Uppercase&lt;'hello'&gt;;
// 'HELLO'
```

### Promise 结果类型提取
提取 Promise 的 resolve 类型。

```typescript
type Awaited&lt;T&gt; = T extends Promise&lt;infer U&gt; ? U : T;

// 使用示例
type PromiseString = Promise&lt;string&gt;;
type Unwrapped = Awaited&lt;PromiseString&gt;;
// string
```

### 深度 Promise 展开
递归展开 Promise 类型。

```typescript
type DeepAwaited&lt;T&gt; = 
  T extends Promise&lt;infer U&gt; ? DeepAwaited&lt;U&gt; : T;

// 使用示例
type NestedPromise = Promise&lt;Promise&lt;string&gt;&gt;;
type DeepUnwrapped = DeepAwaited&lt;NestedPromise&gt;;
// string
```

## 实战练习

### 练习 1：实现 First 类型
获取数组的第一个元素类型。

```typescript
type First&lt;T extends any[]&gt; = T extends [infer U, ...any[]] ? U : never;

// 测试
type arr1 = ['a', 'b', 'c'];
type head1 = First&lt;arr1&gt;; // 'a'
```

### 练习 2：实现 Length 类型
获取元组的长度。

```typescript
type Length&lt;T extends readonly any[]&gt; = T['length'];

// 测试
type tesla = ['tesla', 'model 3', 'model X', 'model Y'];
type teslaLength = Length&lt;tesla&gt;; // 4
```

### 练习 3：实现 If 类型
实现条件类型。

```typescript
type If&lt;C extends boolean, T, F&gt; = C extends true ? T : F;

// 测试
type A = If&lt;true, 'a', 'b'&gt;; // 'a'
type B = If&lt;false, 'a', 'b'&gt;; // 'b'
```

### 练习 4：实现 Concat 类型
连接两个元组。

```typescript
type Concat&lt;T extends readonly any[], U extends readonly any[]&gt; = [...T, ...U];

// 测试
type Result = Concat&lt;[1, 2], [3, 4]&gt;; // [1, 2, 3, 4]
```

## 参考资源

- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [Type Challenges](https://github.com/type-challenges/type-challenges)
- [TypeScript 类型体操通关秘籍](https://juejin.cn/post/7073536680781119518)

