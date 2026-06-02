# Tailwind CSS 实用技巧

## 安装与配置

### 快速安装
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 配置文件配置
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 常用技巧

### 自定义颜色
```js
theme: {
  extend: {
    colors: {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
    },
  },
}
```

### 响应式设计
```html
<!-- sm: 640px+
<!-- md: 768px+
<!-- lg: 1024px+
<!-- xl: 1280px+
<!-- 2xl: 1536px+ -->
<div class="sm:text-sm md:text-base lg:text-lg xl:text-xl">
  响应式文本
</div>
```

### 深色模式
```html
<div class="bg-white dark:bg-gray-800">
  <p class="text-gray-900 dark:text-white">
    深色模式文本
  </p>
</div>
```

### 动画与过渡
```html
<button class="transition-all duration-300 hover:scale-110">
  悬停放大
</button>
```

### 自定义工具类
```js
plugins: [
  function({ addUtilities }) {
    const newUtilities = {
      '.text-shadow': {
        textShadow: '0 2px 4px rgba(0,0,0,0.1)',
      },
    }
    addUtilities(newUtilities)
  },
]
```

## 实用组件模板

### 卡片组件
```html
<div class="bg-white rounded-lg shadow-md p-6">
  <h2 class="text-xl font-bold mb-2">标题</h2>
  <p class="text-gray-600">内容</p>
</div>
```

### 按钮组
```html
<button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
  主要按钮
</button>
<button class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
  次要按钮
</button>
```

### 表单输入
```html
<input 
  type="text" 
  class="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  placeholder="请输入内容"
>
```
