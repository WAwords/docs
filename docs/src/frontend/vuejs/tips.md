# Vue.js 常用技巧

## 响应式数据处理

### 响应式数据转换

```javascript
import { reactive, toRefs } from 'vue'

const state = reactive({
  count: 0,
  name: 'Vue'
})

const { count, name } = toRefs(state)
```

### 计算属性与侦听器

```javascript
import { computed, watch, watchEffect } from 'vue'

const doubleCount = computed(() => count.value * 2)

watch(count, (newVal, oldVal) => {
  console.log(`count 变化: ${oldVal} -> ${newVal}`)
})

watchEffect(() => {
  console.log(`当前 count: ${count.value}`)
})
```

## 组件通信

### Props 与 Events

```vue
<template>
  <ChildComponent :count="count" @update-count="updateCount" />
</template>

<script setup>
import ChildComponent from './ChildComponent.vue'
import { ref } from 'vue'

const count = ref(0)

const updateCount = (newCount) => {
  count.value = newCount
}
</script>
```

### 依赖注入

```javascript
import { provide, inject } from 'vue'

provide('theme', 'dark')

const theme = inject('theme', 'light')
```

## 生命周期钩子

```javascript
import {
  onMounted,
  onUpdated,
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onBeforeUnmount
} from 'vue'

onMounted(() => {
  console.log('组件已挂载')
})

onUnmounted(() => {
  console.log('组件已卸载')
})
```

## 自定义 Hooks

```javascript
import { ref, computed } from 'vue'

export function useCounter() {
  const count = ref(0)
  
  const doubleCount = computed(() => count.value * 2)
  
  const increment = () => {
    count.value++
  }
  
  const decrement = () => {
    count.value--
  }
  
  return {
    count,
    doubleCount,
    increment,
    decrement
  }
}
```

## 性能优化

### v-memo 缓存

```vue
<template>
  <div v-memo="[valueA, valueB]">
    {{ expensiveRender() }}
  </div>
</template>
```

### 组件懒加载

```javascript
import { defineAsyncComponent } from 'vue'

const AsyncComponent = defineAsyncComponent(() =>
  import('./AsyncComponent.vue')
)
```

## 实用技巧

### 模板 ref

```vue
<template>
  <div ref="elementRef"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const elementRef = ref(null)

onMounted(() => {
  console.log(elementRef.value)
})
</script>
```

### 动态组件

```vue
<template>
  <component :is="currentComponent" />
</template>

<script setup>
import { ref } from 'vue'
import ComponentA from './ComponentA.vue'
import ComponentB from './ComponentB.vue'

const currentComponent = ref(ComponentA)
</script>
```
