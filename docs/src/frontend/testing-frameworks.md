
# 前端测试框架

## Jest

Facebook 出品的 JavaScript 测试框架，适用于 React 等项目。

```javascript
// 基础测试
import { sum } from './math';

test('加法测试', () =&gt; {
  expect(sum(1, 2)).toBe(3);
});

// 异步测试
test('异步数据测试', async () =&gt; {
  const data = await fetchData();
  expect(data).toBe('Hello Jest');
});

// 模拟函数
test('模拟函数测试', () =&gt; {
  const mockFn = jest.fn();
  mockFn('call1');
  mockFn('call2', 'arg2');

  expect(mockFn.mock.calls.length).toBe(2);
  expect(mockFn.mock.calls[0][0]).toBe('call1');
  expect(mockFn.mock.calls[1][0]).toBe('call2');
  expect(mockFn.mock.calls[1][1]).toBe('arg2');
});
```

## Vitest

基于 Vite 的单元测试框架，与 Jest 兼容但更快。

```javascript
import { describe, it, expect, vi } from 'vitest';
import { sum } from './math';

describe('数学函数', () =&gt; {
  it('加法测试', () =&gt; {
    expect(sum(1, 2)).toBe(3);
  });

  it('减法测试', () =&gt; {
    expect(sum(5, 2)).toBe(3);
  });
});

// 模拟定时器
test('定时器测试', () =&gt; {
  vi.useFakeTimers();
  const callback = vi.fn();

  setTimeout(callback, 1000);

  expect(callback).not.toHaveBeenCalled();
  vi.runAllTimers();
  expect(callback).toHaveBeenCalledTimes(1);
});
```

## React Testing Library

React 组件测试库，强调用户行为。

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('按钮点击测试', () =&gt; {
  const handleClick = jest.fn();
  render(&lt;Button onClick={handleClick}&gt;点击我&lt;/Button&gt;);
  
  const button = screen.getByText('点击我');
  fireEvent.click(button);
  
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('表单提交测试', () =&gt; {
  render(&lt;Form /&gt;);
  
  const input = screen.getByLabelText('用户名');
  const submit = screen.getByText('提交');
  
  fireEvent.change(input, { target: { value: 'test' } });
  fireEvent.click(submit);
  
  expect(screen.getByText('提交成功')).toBeInTheDocument();
});
```

## Vue Test Utils

Vue.js 官方测试工具库。

```vue
&lt;script setup&gt;
import { ref } from 'vue';

const count = ref(0);
const increment = () =&gt; count.value++;
&lt;/script&gt;

&lt;template&gt;
  &lt;div&gt;
    &lt;span data-testid="count"&gt;{{ count }}&lt;/span&gt;
    &lt;button @click="increment"&gt;增加&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;
```

```javascript
import { mount } from '@vue/test-utils';
import Counter from './Counter.vue';

test('计数器测试', async () =&gt; {
  const wrapper = mount(Counter);
  
  expect(wrapper.find('[data-testid="count"]').text()).toBe('0');
  
  await wrapper.find('button').trigger('click');
  
  expect(wrapper.find('[data-testid="count"]').text()).toBe('1');
});
```

## Cypress

端到端（E2E）测试框架。

```javascript
describe('首页测试', () =&gt; {
  beforeEach(() =&gt; {
    cy.visit('/');
  });

  it('显示标题', () =&gt; {
    cy.contains('欢迎');
  });

  it('导航到关于页面', () =&gt; {
    cy.contains('关于').click();
    cy.url().should('include', '/about');
    cy.contains('关于我们');
  });

  it('表单提交', () =&gt; {
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.contains('登录成功');
  });
});
```

## Playwright

微软出品的 E2E 测试框架，支持多浏览器。

```javascript
import { test, expect } from '@playwright/test';

test('基本测试', async ({ page }) =&gt; {
  await page.goto('https://example.com');
  
  await expect(page).toHaveTitle(/Example Domain/);
  
  await page.click('text=More information');
  await expect(page).toHaveURL(/example.com/');
});

test('表单测试', async ({ page }) =&gt; {
  await page.goto('/login');
  
  await page.fill('input[name="username"]', 'testuser');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  
  await expect(page.locator('.success-message')).toBeVisible();
});
```

## Testing Library 最佳实践

```javascript
// ❌ 不推荐
getByTestId('submit-button').click();

// ✅ 推荐
getByRole('button', { name: /提交/i }).click();

// ❌ 不推荐
expect(container.firstChild).toMatchSnapshot();

// ✅ 推荐
expect(screen.getByRole('heading')).toHaveTextContent('标题');
```

## 覆盖率报告

```javascript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{js,ts,vue'],
      exclude: ['src/**/*.spec.{js,ts}'],
    },
  },
});
```

