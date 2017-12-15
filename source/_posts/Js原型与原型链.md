---
title: Js原型与原型链
date: 2017-11-06 08:34:27
tags: javascript
---

# 基本关系-原型链

原型链的问题，很少接触到，但还是要着重的去了解，这里总结如下

<!-- more -->

实例1：对象与类
``` javascript
    p1 = new Point()
    p2 = new Point()
// 有如下的关系
    p1.constructor === Point
    p1.constructor.prototype === Point.prototype
    p1.__proto__ === Point.prototype
    p2.__proto__ === Point.prototype
```              
### 总结关系图如下
![img](clipboard.png)
\_\_proto\_\_返回实例对象的构造器的原型
prototype返回类的原型

实例2：继承
``` javascript
    // B类继承了Point类
    B.__proto__ === Point
    B.prototype.__proto__ === Point.prototype
    // 特别说明
    B.prototype.constructor === B
    // 是B本身，而不是Point，这是因为B是继承的Point，而不是Point构造函数通过new出来的实例
```

### 总结关系图如下
![img](clipboard_4.png)

为什么会有这样的结论，下面给出实际的论证:

# 实际论证
在控制台分别打印console.dir(),这里就不上图了
### new Array()
打印一个数组对象的值，constructor是封装在class内部的

### new Array().constructor
打印一个数组对象的constructor，就是Array本身

### Array.prototype
打印一个数组类的prototype, 是该类的原型
打印new Array().\_\_proto\_\_的结果也是如此，此处不再重复截图

### new Array().prototype
一个数组对象没有prototype属性

有兴趣的小伙伴可以自己试一试

一个更加详尽的关系图
![img](clipboard_5.png)
最终Object.prototype./_/_proto/_/_ === null原型链结束

# 应用

* 添加方法或者属性
从上面的dir，可以看出，Array类的prototype保存的是数组的方法和属性
所以我们可以在prototype中直接添加
``` javascript
Array.prototype.sayName = () => {...}
\\ 等同于
p1.__proto__.sayName = () => {...}
```

* 共享特性
Array类的prototype还有一个特点，
那就是所有实现该类的对象都共享prototype里的方法和属性
``` javascript
p1.__proto__.sayName = () => {...}
p2.sayName() // correct
```

* 重写原型
当一个类，重写了prototype原型后，之前实现该类的对象会怎么样呢？
``` javascript
p1 = new Array()
Array.prototype = {
    name: 'XyyF'
}
p1.name // error
p1.length // correct
```
因为重写了Array的原型后，p1对象的\_\_proto\_\_还是指向Array原先的prototype原型
只有Array的prototype单独指向了新的对象

* 原型链与instanceof
我们有时经常会判断一个变量的是否属于一个类，那么其中的流程是怎么样的呢？
假设 obj instanceof Class
流程：会从obj的原型链中找到和Class的原型相同的原型，则返回true,反之亦然