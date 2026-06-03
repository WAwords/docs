# CSS Flexbox 布局指南

## 概述

Flexbox（弹性盒布局）是 CSS3 中的一种一维布局模型，用于在容器中分配空间和对齐元素。

## 容器属性

### display: flex

```css
.container {
  display: flex;
}
```

### flex-direction 主轴方向

```css
.container {
  display: flex;
  flex-direction: row | row-reverse | column | column-reverse;
}
```

| 属性值 | 描述 |
|--------|------|
| row | 从左到右（默认） |
| row-reverse | 从右到左 |
| column | 从上到下 |
| column-reverse | 从下到上 |

### flex-wrap 换行方式

```css
.container {
  display: flex;
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

### justify-content 主轴对齐

```css
.container {
  display: flex;
  justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
}
```

| 属性值 | 描述 |
|--------|------|
| flex-start | 左对齐（默认） |
| flex-end | 右对齐 |
| center | 居中对齐 |
| space-between | 两端对齐，项目之间间距相等 |
| space-around | 每个项目两侧间距相等 |
| space-evenly | 项目之间间距完全相等 |

### align-items 交叉轴对齐

```css
.container {
  display: flex;
  align-items: stretch | flex-start | flex-end | center | baseline;
}
```

| 属性值 | 描述 |
|--------|------|
| stretch | 拉伸以适应容器（默认） |
| flex-start | 交叉轴起点对齐 |
| flex-end | 交叉轴终点对齐 |
| center | 交叉轴居中对齐 |
| baseline | 项目基线对齐 |

### align-content 多行对齐

```css
.container {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

### gap 间距

```css
.container {
  display: flex;
  gap: 10px;
  gap: 10px 20px; /* 行间距 列间距 */
}
```

## 项目属性

### flex-grow 放大比例

```css
.item {
  flex-grow: 1; /* 默认 0，不放大 */
}
```

### flex-shrink 缩小比例

```css
.item {
  flex-shrink: 0; /* 默认 1，可缩小 */
}
```

### flex-basis 初始大小

```css
.item {
  flex-basis: 200px; /* 默认 auto */
}
```

### flex 简写

```css
.item {
  flex: 1 1 auto; /* flex-grow flex-shrink flex-basis */
  flex: 1;       /* 简写，等价于 1 1 0% */
}
```

### align-self 单独对齐

```css
.item {
  align-self: auto | flex-start | flex-end | center | stretch;
}
```

### order 排列顺序

```css
.item {
  order: 1; /* 默认 0，数值越小越靠前 */
}
```

## 实用布局

### 水平居中

```css
.container {
  display: flex;
  justify-content: center;
}
```

### 垂直居中

```css
.container {
  display: flex;
  align-items: center;
}
```

### 水平垂直居中

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### 导航栏

```css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
```

### 卡片网格

```css
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 1 1 300px; /* 最小 300px，自适应填满 */
}
```

### 圣杯布局

```css
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  flex: 0 0 auto;
}

.main {
  flex: 1;
}

.footer {
  flex: 0 0 auto;
}
```

### 均等分列

```css
.columns {
  display: flex;
}

.column {
  flex: 1;
}
```

### 底部固定栏

```css
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}

.fixed-bottom {
  flex-shrink: 0;
}
```

## 常见问题

### flex 子元素高度不一致

```css
.container {
  align-items: flex-start; /* 或使用 align-items: baseline */
}
```

### flex 子元素宽度被挤压

```css
.item {
  flex-shrink: 0;
  min-width: 0; /* 防止文字溢出 */
}
```

### 换行后行间距

```css
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  /* 或者使用 margin */
}
```

## 浏览器兼容性

Flexbox 被所有现代浏览器支持，包括：
- Chrome 29+
- Firefox 28+
- Safari 9+
- Edge 12+
- Opera 48+

对于旧版浏览器，可使用以下前缀：

```css
.container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}
```
