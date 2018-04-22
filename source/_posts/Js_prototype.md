---
title: Js原型与原型链
date: 2017-11-06 08:34:27
tags: 原型链
---

# 基本关系-原型链

原型链的问题，很少接触到，但还是要着重的去了解，这里总结如下

本文解决问题：
- prototype和\_\_proto\_\_
- 原型链的理解
- 继承的几种方式

<!-- more -->

## prototype和\_\_proto\_\_

对于prototype和\_\_proto\_\_有这样的关系：
只有对象的\_\_proto\_\_才有实际的属性值
只有函数/类有prototype属性

\_\_proto\_\_是部分浏览器实现的，大多数情况相当于\_\_proto\_\_ === constructor.prototype

## 原型链的理解
``` javascript
    function A() {
        // 这里面的内容就是constructor构造器的内容
    }
    A1 = new A()
// 有如下的关系
    a1.constructor === A
    a1.constructor.prototype === A.prototype
    a1.__proto__ === A.prototype
```

### 总结关系图如下(中间省略部分原型链)

![img](clipboard.png)
可以看出：
- prototype和__proto__作用的范围,前者是类,后者是对象
- A的内部定义的即是class中constructor的内容
- A.prototype的constructor是指向A本身的
- 所有的类都继承Object类,原型链中是通过\_\_proto\_\_展现的
- Object.prototype.\_\_proto\_\_是原型链的终点,指向null

实例2：继承
``` bash
    // B类继承了Point类 B.prototype = new Point()
    B.__proto__ === Point
    B.prototype.__proto__ === Point.prototype
    // 特别说明
    B.prototype.constructor === B
    // 是B本身，一个类的原型的构造器都应该指向自身
```

### 总结关系图如下
![img](clipboard_7.png)
- B继承了Point,即B的对象也可以使用Point的prototype的属性,而且B。prototype的constructor还是B本身。

为什么会有这样的结论，下面给出实际的论证:

### 应用

* 添加方法或者属性
从上面可以看出，类的prototype保存的是方法和属性
所以我们可以在prototype中直接添加
``` javascript
Array.prototype.sayName = () => {...}
// 也可以对NodeList数组(querySelectorAll)调用数组方法
Array.prototype.map(arr, function() {})
```

* 共享特性
类的prototype还有一个特点，
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