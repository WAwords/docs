
# 前端常用工具库

## 日期处理

### Day.js
轻量级的日期处理库，API 设计与 Moment.js 类似，但体积更小。

```javascript
import dayjs from 'dayjs';

// 格式化日期
dayjs('2024-01-01').format('YYYY-MM-DD HH:mm:ss');

// 日期计算
dayjs().add(7, 'day').subtract(1, 'month');

// 相对时间
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
dayjs('2024-01-01').fromNow();
```

### date-fns
函数式的日期库，提供模块化的函数调用。

```javascript
import { format, addDays, differenceInDays } from 'date-fns';

const date = new Date();
format(date, 'yyyy-MM-dd');
addDays(date, 7);
differenceInDays(new Date('2024-01-10'), new Date('2024-01-01'));
```

## 数据验证

### Zod
TypeScript 优先的模式声明和验证库。

```javascript
import { z } from 'zod';

// 定义数据模型
const userSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  age: z.number().min(18).optional(),
});

// 验证数据
const result = userSchema.safeParse({
  username: 'john',
  email: 'john@example.com',
  age: 25,
});

if (result.success) {
  console.log(result.data);
} else {
  console.log(result.error);
}
```

### Joi
强大的数据验证库，适合 Node.js 和浏览器环境。

```javascript
import Joi from 'joi';

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  repeat_password: Joi.ref('password'),
  access_token: [Joi.string(), Joi.number()],
  birth_year: Joi.number().integer().min(1900).max(2013),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
});
```

## 工具函数

### Lodash
功能全面的实用工具库。

```javascript
import _ from 'lodash';

// 深拷贝
const deepCopy = _.cloneDeep(obj);

// 防抖
const debouncedFn = _.debounce(fn, 300);

// 节流
const throttledFn = _.throttle(fn, 300);

// 分组
_.groupBy(array, 'category');

// 数组去重
_.uniqBy(array, 'id');
```

### Ramda
函数式编程风格的工具库。

```javascript
import R from 'ramda';

// 管道操作
const process = R.pipe(
  R.filter(R.propSatisfies(R.gte(R.__, 18), 'age')),
  R.map(R.pick(['name', 'email'])),
);

// 柯里化
const add = R.curry((a, b) =&gt; a + b);
const add5 = add(5);
```

## 状态管理

### Zustand
轻量级的状态管理库，适合 React 应用。

```javascript
import { create } from 'zustand';

const useStore = create((set) =&gt; ({
  count: 0,
  increment: () =&gt; set((state) =&gt; ({ count: state.count + 1 })),
  decrement: () =&gt; set((state) =&gt; ({ count: state.count - 1 })),
}));

// 使用
function Counter() {
  const { count, increment, decrement } = useStore();
  return (
    &lt;div&gt;
      &lt;span&gt;{count}&lt;/span&gt;
      &lt;button onClick={increment}&gt;+&lt;/button&gt;
      &lt;button onClick={decrement}&gt;-&lt;/button&gt;
    &lt;/div&gt;
  );
}
```

### Pinia
Vue 3 官方推荐的状态管理库。

```javascript
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () =&gt; ({ count: 0 }),
  getters: {
    doubleCount: (state) =&gt; state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
```

## HTTP 请求

### Axios
基于 Promise 的 HTTP 客户端。

```javascript
import axios from 'axios';

// 创建实例
const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
});

// 请求拦截器
api.interceptors.request.use((config) =&gt; {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 响应拦截器
api.interceptors.response.use(
  (response) =&gt; response.data,
  (error) =&gt; Promise.reject(error),
);

// 请求示例
api.get('/users').then((data) =&gt; console.log(data));
```

### Ky
基于 Fetch API 的轻量级 HTTP 客户端。

```javascript
import ky from 'ky';

const api = ky.create({
  prefixUrl: 'https://api.example.com',
  timeout: 10000,
  hooks: {
    beforeRequest: [
      (request) =&gt; {
        request.headers.set('Authorization', `Bearer ${token}`);
      },
    ],
  },
});

const data = await api.get('users').json();
```

## 表单处理

### React Hook Form
React 高性能表单处理库。

```javascript
import { useForm } from 'react-hook-form';

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) =&gt; console.log(data);

  return (
    &lt;form onSubmit={handleSubmit(onSubmit)}&gt;
      &lt;input {...register('username', { required: true })} /&gt;
      {errors.username &amp;&amp; &lt;span&gt;必填&lt;/span&gt;}
      &lt;input type="submit" /&gt;
    &lt;/form&gt;
  );
}
```

### VeeValidate
Vue.js 表单验证库。

```vue
&lt;template&gt;
  &lt;Form @submit="onSubmit"&gt;
    &lt;Field name="email" rules="required|email" /&gt;
    &lt;ErrorMessage name="email" /&gt;
    &lt;button type="submit"&gt;提交&lt;/button&gt;
  &lt;/Form&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { Form, Field, ErrorMessage } from 'vee-validate';

const onSubmit = (values) =&gt; {
  console.log(values);
};
&lt;/script&gt;
```

## 动画库

### Framer Motion
React 动画库，提供声明式 API。

```javascript
import { motion } from 'framer-motion';

function AnimatedComponent() {
  return (
    &lt;motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    &gt;
      动画内容
    &lt;/motion.div&gt;
  );
}
```

### GSAP
强大的动画库，适用于各种动画场景。

```javascript
import { gsap } from 'gsap';

// 基础动画
gsap.to('.box', {
  x: 100,
  rotation: 360,
  duration: 2,
  ease: 'power2.out',
});

// 时间线
const tl = gsap.timeline();
tl.to('.box1', { x: 100, duration: 1 })
  .to('.box2', { y: 100, duration: 1 }, '-=0.5')
  .to('.box3', { rotation: 180, duration: 1 });
```

## 其他实用库

### classnames
条件类名拼接工具。

```javascript
import classNames from 'classnames';

// 基础用法
const className = classNames('foo', 'bar', { baz: true });
// =&gt; 'foo bar baz'

// 数组用法
const className = classNames(['foo', 'bar']);
// =&gt; 'foo bar'

// 混合用法
const className = classNames('foo', { bar: true, baz: false }, ['qux']);
// =&gt; 'foo bar qux'
```

### nanoid
生成唯一 ID 的轻量级库。

```javascript
import { nanoid } from 'nanoid';

// 生成随机 ID
const id = nanoid();
// =&gt; "V1StGXR8_Z5jdHi6B-myT"

// 指定长度
const id = nanoid(10);
// =&gt; "IRFa-VaY2b"
```

### qs
URL 查询字符串解析和序列化库。

```javascript
import qs from 'qs';

// 序列化
qs.stringify({ a: 1, b: 2 });
// =&gt; 'a=1&amp;b=2'

// 解析
qs.parse('a=1&amp;b=2');
// =&gt; { a: '1', b: '2' }

// 嵌套对象
qs.stringify({ a: { b: { c: 'd' } } }, { depth: 2 });
// =&gt; 'a[b][c]=d'
```
