# CSS 动画实用指南

## 基础动画属性

### transition - 过渡动画

用于在元素状态变化时添加过渡效果。

```css
.box {
  /* 简写 */
  transition: all 0.3s ease;
  /* 完整写法 */
  transition-property: all;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  transition-delay: 0s;
}
```

### animation - 关键帧动画

通过 @keyframes 定义动画效果。

```css
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.element {
  animation: slideIn 0.5s ease-out;
}
```

## 时间函数

### 常用时间函数

```css
/* 匀速 */
transition-timing-function: linear;

/* 先慢后快再慢 */
transition-timing-function: ease;

/* 先慢后快 */
transition-timing-function: ease-in;

/* 先快后慢 */
transition-timing-function: ease-out;

/* 先慢后快再慢 */
transition-timing-function: ease-in-out;

/* 自定义贝塞尔曲线 */
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

/* 阶梯函数 */
transition-timing-function: steps(4, end);
```

## 常用动画示例

### 淡入淡出

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
```

### 缩放动画

```css
@keyframes scaleUp {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
```

### 旋转动画

```css
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

### 弹跳动画

```css
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}
```

### 抖动动画

```css
@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-10px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(10px);
  }
}
```

### 脉冲动画

```css
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
```

## 动画属性详解

### animation-fill-mode

定义动画在执行之前和之后如何将样式应用于目标元素。

```css
/* 默认值，动画执行前后不影响元素 */
animation-fill-mode: none;

/* 动画结束后保持最后一帧 */
animation-fill-mode: forwards;

/* 动画开始前应用第一帧 */
animation-fill-mode: backwards;

/* 同时应用 forwards 和 backwards */
animation-fill-mode: both;
```

### animation-direction

定义动画是否应该反向播放。

```css
/* 正常播放 */
animation-direction: normal;

/* 反向播放 */
animation-direction: reverse;

/* 先正向再反向 */
animation-direction: alternate;

/* 先反向再正向 */
animation-direction: alternate-reverse;
```

### animation-iteration-count

定义动画播放次数。

```css
/* 播放一次 */
animation-iteration-count: 1;

/* 无限循环 */
animation-iteration-count: infinite;

/* 播放 3 次 */
animation-iteration-count: 3;
```

## 性能优化

### 使用 transform 和 opacity

尽量使用 `transform` 和 `opacity` 来实现动画，这些属性不会触发重排和重绘，性能更好。

```css
/* 推荐 */
.animated {
  transform: translate(50px, 50px);
  opacity: 0.8;
}

/* 避免 */
.animated {
  left: 50px;
  top: 50px;
}
```

### 硬件加速

使用 `will-change` 提示浏览器元素即将发生变化。

```css
.element {
  will-change: transform, opacity;
}
```

### 减少动画元素数量

避免同时对大量元素执行动画，保持页面流畅。
