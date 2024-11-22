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
