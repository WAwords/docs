# CSS Grid 布局指南

## 基本概念

CSS Grid 是一种二维布局系统，可以同时处理行和列，是现代 CSS 布局的重要组成部分。

### Grid 容器与项目

```css
.container {
  display: grid; /* 或 inline-grid */
}
```

## 定义网格

### grid-template-columns / grid-template-rows

定义网格的列和行。

```css
.container {
  display: grid;
  /* 定义 3 列，每列宽度为 100px */
  grid-template-columns: 100px 100px 100px;
  /* 定义 2 行，每行高度为 50px */
  grid-template-rows: 50px 50px;
}
```

### fr 单位

按比例分配空间。

```css
.container {
  display: grid;
  /* 3 列，比例为 1:2:1 */
  grid-template-columns: 1fr 2fr 1fr;
}
```

### repeat() 函数

重复定义列或行。

```css
.container {
  display: grid;
  /* 3 列，每列 100px */
  grid-template-columns: repeat(3, 100px);
  /* 自动填充，最小 100px，最大 1fr */
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
}
```

### minmax() 函数

设置最小和最大尺寸。

```css
.container {
  display: grid;
  grid-template-columns: minmax(100px, 1fr) 1fr;
}
```

## 网格间距

### gap / row-gap / column-gap

设置网格项之间的间距。

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* 行间距和列间距都为 20px */
  gap: 20px;
  /* 分别设置 */
  row-gap: 10px;
  column-gap: 20px;
}
```

## 放置网格项

### grid-column / grid-row

指定网格项的位置。

```css
.item {
  /* 从第 1 条列线开始，到第 3 条列线结束 */
  grid-column: 1 / 3;
  /* 从第 1 条行线开始，到第 2 条行线结束 */
  grid-row: 1 / 2;
}

/* 使用 span 关键字 */
.item {
  grid-column: 1 / span 2; /* 跨越 2 列 */
  grid-row: 2 / span 1; /* 跨越 1 行 */
}
```

### grid-area

使用区域名称放置网格项。

```css
.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}

.header {
  grid-area: header;
}

.sidebar {
  grid-area: sidebar;
}

.main {
  grid-area: main;
}

.footer {
  grid-area: footer;
}
```

## 对齐方式

### justify-items / align-items

在网格容器内对齐所有网格项。

```css
.container {
  display: grid;
  /* 水平对齐：start | end | center | stretch（默认） */
  justify-items: center;
  /* 垂直对齐：start | end | center | stretch（默认） */
  align-items: center;
  /* 简写 */
  place-items: center;
}
```

### justify-content / align-content

对齐整个网格（当网格小于容器时）。

```css
.container {
  display: grid;
  /* 水平对齐 */
  justify-content: center;
  /* 垂直对齐 */
  align-content: center;
  /* 简写 */
  place-content: center;
}
```

### justify-self / align-self

对齐单个网格项。

```css
.item {
  justify-self: end;
  align-self: end;
  place-self: end;
}
```

## 自动布局

### grid-auto-columns / grid-auto-rows

定义隐式网格的大小。

```css
.container {
  display: grid;
  grid-template-columns: 100px 100px;
  /* 隐式行的高度为 50px */
  grid-auto-rows: 50px;
}
```

### grid-auto-flow

控制自动放置算法。

```css
.container {
  display: grid;
  /* row（默认） | column | dense */
  grid-auto-flow: row;
}
```

## 实用示例

### 经典圣杯布局

```css
.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
```

### 响应式卡片布局

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
```

### 12 列网格系统

```css
.container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
}

.col-6 {
  grid-column: span 6;
}

.col-4 {
  grid-column: span 4;
}
```
