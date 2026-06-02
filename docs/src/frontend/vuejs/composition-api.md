# Vue 3 组合式 API 入门指南

本文档介绍 Vue 3 组合式 API (Composition API) 的核心概念和常用方法，帮助你快速上手 Vue 3 开发。

## setup 函数

### 基本用法

```vue
<template>
  <div>{{ count }}</div>
</template>

<script setup>
import { ref } from 'vue';

// 定义响应式数据
const count = ref(0);

// 定义方法
const increment = () => {
  count.value++;
};
</script>
```

### 非 setup 语法糖写法

```vue
<template>
  <div>{{ count }}</div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const count = ref(0);

    const increment = () => {
      count.value++;
    };

    // 返回给模板使用
    return {
      count,
      increment
    };
  }
};
</script>
```

## 响应式数据

### ref

用于创建基本类型的响应式数据。

```js
import { ref } from 'vue';

// 定义 ref
const count = ref(0);
const message = ref('Hello');

// 在 JavaScript 中访问需要加 .value
console.log(count.value); // 0

// 修改
count.value++;
message.value = 'Hi';
```

### reactive

用于创建对象类型的响应式数据。

```js
import { reactive } from 'vue';

// 定义 reactive
const state = reactive({
  count: 0,
  name: '张三',
  address: {
    city: '北京'
  }
});

// 直接访问和修改，不需要 .value
console.log(state.count); // 0
state.count++;
state.address.city = '上海';
```

### ref vs reactive

| 特性 | ref | reactive |
|------|-----|----------|
| 适用类型 | 基本类型 + 对象 | 仅对象 |
| 访问方式 | 需要 .value | 直接访问 |
| 解构赋值 | 无影响 | 会失去响应性 |

## 计算属性

### 基本用法

```js
import { ref, computed } from 'vue';

const firstName = ref('张');
const lastName = ref('三');

// 计算属性
const fullName = computed(() => {
  return firstName.value + lastName.value;
});

console.log(fullName.value); // 张三
```

### 可写计算属性

```js
const fullName = computed({
  get() {
    return firstName.value + lastName.value;
  },
  set(value) {
    const [f, l] = value.split('');
    firstName.value = f;
    lastName.value = l;
  }
});

fullName.value = '李四';
console.log(firstName.value); // 李
```

## 侦听器

### watch

侦听特定数据源的变化。

```js
import { ref, watch } from 'vue';

const count = ref(0);

// 侦听单个 ref
watch(count, (newValue, oldValue) => {
  console.log(`count 从 ${oldValue} 变为 ${newValue}`);
});

count.value++; // 触发
```

### watchEffect

自动追踪依赖，当依赖变化时执行。

```js
import { ref, watchEffect } from 'vue';

const count = ref(0);

// 自动追踪 count 的变化
watchEffect(() => {
  console.log(`count 的值是: ${count.value}`);
});

count.value++; // 触发
```

### 侦听多个源

```js
const a = ref(0);
const b = ref(0);

watch([a, b], ([newA, newB], [oldA, oldB]) => {
  console.log(`a: ${oldA} -> ${newA}, b: ${oldB} -> ${newB}`);
});
```

## 生命周期钩子

### 常用生命周期

```js
import {
  onMounted,
  onUpdated,
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onBeforeUnmount
} from 'vue';

// 组件挂载前
onBeforeMount(() => {
  console.log('onBeforeMount');
});

// 组件挂载后
onMounted(() => {
  console.log('onMounted');
});

// 组件更新前
onBeforeUpdate(() => {
  console.log('onBeforeUpdate');
});

// 组件更新后
onUpdated(() => {
  console.log('onUpdated');
});

// 组件卸载前
onBeforeUnmount(() => {
  console.log('onBeforeUnmount');
});

// 组件卸载后
onUnmounted(() => {
  console.log('onUnmounted');
});
```

## 组件通信

### Props

```vue
<script setup>
// 定义 props
const props = defineProps({
  title: String,
  count: {
    type: Number,
    default: 0
  }
});

// 使用 props
console.log(props.title);
</script>
```

### Emits

```vue
<script setup>
// 定义 emits
const emit = defineEmits(['increment', 'update']);

// 触发事件
const handleClick = () => {
  emit('increment', 1);
};
</script>
```

### provide / inject

```js
// 父组件
import { provide, ref } from 'vue';

const theme = ref('light');
provide('theme', theme);

// 子组件
import { inject } from 'vue';

const theme = inject('theme', 'default'); // 第二个参数是默认值
```

## 自定义 Hooks

### 示例：计数器 Hook

```js
// useCounter.js
import { ref } from 'vue';

export function useCounter(initialValue = 0) {
  const count = ref(initialValue);

  const increment = () => {
    count.value++;
  };

  const decrement = () => {
    count.value--;
  };

  const reset = () => {
    count.value = initialValue;
  };

  return {
    count,
    increment,
    decrement,
    reset
  };
}
```

### 使用 Hook

```vue
<script setup>
import { useCounter } from './useCounter';

const { count, increment, decrement, reset } = useCounter(10);
</script>
```

## toRefs 和 toRef

### toRefs

将 reactive 对象转换为 ref 对象，解构后保持响应性。

```js
import { reactive, toRefs } from 'vue';

const state = reactive({
  count: 0,
  name: '张三'
});

// 解构后仍保持响应性
const { count, name } = toRefs(state);
```

### toRef

为 reactive 对象的单个属性创建 ref。

```js
import { reactive, toRef } from 'vue';

const state = reactive({
  count: 0
});

const countRef = toRef(state, 'count');
```

## 完整示例

```vue
<template>
  <div class="counter">
    <h1>{{ title }}</h1>
    <p>计数: {{ count }}</p>
    <p>双倍: {{ doubleCount }}</p>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
    <button @click="reset">重置</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// Props
const props = defineProps({
  initialCount: {
    type: Number,
    default: 0
  }
});

// Emits
const emit = defineEmits(['count-changed']);

// 响应式数据
const count = ref(props.initialCount);
const title = ref('计数器');

// 计算属性
const doubleCount = computed(() => count.value * 2);

// 方法
const increment = () => {
  count.value++;
  emit('count-changed', count.value);
};

const decrement = () => {
  count.value--;
  emit('count-changed', count.value);
};

const reset = () => {
  count.value = props.initialCount;
  emit('count-changed', count.value);
};

// 生命周期
onMounted(() => {
  console.log('组件已挂载');
});
</script>

<style scoped>
.counter {
  padding: 20px;
}
button {
  margin: 0 5px;
  padding: 5px 15px;
}
</style>
```
