# JavaScript 设计模式

## 什么是设计模式

设计模式是软件设计中常见问题的通用解决方案，它描述了在特定场景下如何组织代码结构，以提高代码的可维护性、可扩展性和可读性。

## 常用设计模式

### 1. 单例模式 (Singleton)

确保一个类只有一个实例，并提供一个全局访问点。

```javascript
class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    this.value = '初始值';
    Singleton.instance = this;
  }

  getValue() {
    return this.value;
  }

  setValue(value) {
    this.value = value;
  }
}

const instance1 = new Singleton();
const instance2 = new Singleton();
console.log(instance1 === instance2); // true
```

### 2. 工厂模式 (Factory)

定义一个创建对象的接口，让子类决定实例化哪个类。

```javascript
class Product {
  constructor(name) {
    this.name = name;
  }
}

class Factory {
  create(type) {
    switch (type) {
      case 'A':
        return new Product('Product A');
      case 'B':
        return new Product('Product B');
      default:
        throw new Error('Unknown type');
    }
  }
}

const factory = new Factory();
const productA = factory.create('A');
```

### 3. 观察者模式 (Observer)

定义对象间的一对多依赖，当一个对象状态改变时，所有依赖者都会收到通知。

```javascript
class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(o => o !== observer);
  }

  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class Observer {
  update(data) {
    console.log('收到通知:', data);
  }
}

const subject = new Subject();
const observer = new Observer();
subject.subscribe(observer);
subject.notify('Hello World');
```

### 4. 装饰器模式 (Decorator)

动态地给对象添加额外的职责。

```javascript
class Component {
  operation() {
    return '基础操作';
  }
}

class Decorator {
  constructor(component) {
    this.component = component;
  }

  operation() {
    return `装饰后的: ${this.component.operation()}`;
  }
}

const component = new Component();
const decorated = new Decorator(component);
console.log(decorated.operation()); // 装饰后的: 基础操作
```

### 5. 策略模式 (Strategy)

定义一系列算法，把它们封装起来，并使它们可以相互替换。

```javascript
class Strategy {
  execute() {}
}

class ConcreteStrategyA extends Strategy {
  execute() {
    return '策略A执行';
  }
}

class ConcreteStrategyB extends Strategy {
  execute() {
    return '策略B执行';
  }
}

class Context {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  executeStrategy() {
    return this.strategy.execute();
  }
}

const context = new Context(new ConcreteStrategyA());
console.log(context.executeStrategy()); // 策略A执行
context.setStrategy(new ConcreteStrategyB());
console.log(context.executeStrategy()); // 策略B执行
```

## 设计模式的价值

1. **可复用性**: 解决同类问题的通用方案
2. **可维护性**: 代码结构清晰，易于理解和修改
3. **可扩展性**: 便于添加新功能而不影响现有代码
4. **沟通效率**: 提供通用的设计语言

## 何时使用设计模式

- 当遇到重复出现的问题时
- 当需要提高代码的可维护性时
- 当团队协作需要统一的设计规范时
- 当项目需要长期维护和扩展时