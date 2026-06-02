
# CSS 现代布局技巧

本文档整理 CSS 现代布局的实用技巧，包括 Flexbox、Grid 和其他常用布局模式。

## Flexbox 布局

### 基础用法

```css
.container {
  display: flex;
  flex-direction: row; /* 主轴方向 */
  flex-wrap: wrap; /* 换行 */
  justify-content: center; /* 主轴对齐 */
  align-items: center; /* 交叉轴对齐 */
  gap: 10px; /* 元素间距 */
}
```

### 常见布局模式

#### 水平垂直居中

```css
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

#### 两端对齐，中间自适应

```css
.space-between {
  display: flex;
  justify-content: space-between;
}
```

#### 等分布局

```css
.equal-columns {
  display: flex;
}
.equal-columns &gt; * {
  flex: 1;
}
```

#### 圣杯布局

```css
.holy-grail {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
.holy-grail .content {
  display: flex;
  flex: 1;
}
.holy-grail .main {
  flex: 1;
}
.holy-grail .nav,
.holy-grail .aside {
  flex: 0 0 200px;
}
```

## Grid 布局

### 基础用法

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 列等宽 */
  grid-template-rows: auto;
  gap: 20px;
}
```

### 网格布局技巧

#### 响应式网格

```css
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
```

#### 网格区域

```css
.area-grid {
  display: grid;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  gap: 10px;
}
.header { grid-area: header; }
.nav { grid-area: nav; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
```

#### 子网格

```css
.parent {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.child {
  display: grid;
  grid-template-columns: subgrid; /* 继承父网格列 */
}
```

## 其他实用布局

### 粘性定位

```css
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 100;
}
```

### 两栏布局（左侧固定，右侧自适应）

```css
.two-column {
  display: grid;
  grid-template-columns: 250px 1fr;
}
```

### 瀑布流布局（CSS Columns）

```css
.masonry {
  column-count: 3;
  column-gap: 20px;
}
.masonry-item {
  break-inside: avoid;
  margin-bottom: 20px;
}
```

### 堆叠卡片效果

```css
.card-stack {
  display: grid;
}
.card-stack .card {
  grid-area: 1 / 1;
}
```

## 常见问题解决

### 内容溢出处理

```css
.overflow-handle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 多行省略 */
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### 图片自适应

```css
img {
  max-width: 100%;
  height: auto;
}

/* 覆盖填充 */
.cover {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
```

::: tip 提示
优先使用 Flexbox 和 Grid 进行布局，减少 float 和 position 的使用。
:::

