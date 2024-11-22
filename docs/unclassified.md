# 未分类

## TS 函数重载

所有 TS 最终都会编译成 JS，而 JS 的重载比较 LOW，所以 TS 写重载不过是添加了点注释

```ts
export function add(a: number, b: number): number;
export function add(a: { a?: number; b: number }): number;

export function add(a: number | { a?: number; b: number }, b?: number): number {
  if (typeof a === "number") {
  } else {
    ({ a = 0, b } = a); // JS函数重载中，解构赋值比较好用
  }
  // 逻辑...
}
```

## 正则表达式

```
‌普通字符 ‌：如 a 到 z 的字母、0 到 9 的数字等。
‌特殊字符 ‌（元字符）：包括但不限于：
.：匹配除换行符以外的任意单个字符。
*：匹配前面的子表达式零次或多次。
+：匹配前面的子表达式一次或多次。
?：匹配前面的子表达式零次或一次。
|：匹配左边或右边的表达式。
()：标记一个子表达式的开始和结束，可以捕获子匹配。
[]：用来表示一组字符，单独列出：[amk] 匹配 'a'，'m' 或 'k'。
{}：用于指定前面的子表达式的出现次数。
```
