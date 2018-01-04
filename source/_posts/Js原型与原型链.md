---
title: Js原型与原型链
date: 2017-11-06 08:34:27
tags: javascript
---

# 基本关系-原型链

原型链的问题，很少接触到，但还是要着重的去了解，这里总结如下

本文解决问题：
- 对象与类的关系
- 继承的几种方式

<!-- more -->

## 对象与类的关系

实例1：对象与类
``` javascript
    function Point() {
        // 这里面的内容就是constructor构造器的内容
    }
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
    // B类继承了Point类 B.prototype = new Point()
    B.__proto__ === Point
    B.prototype.__proto__ === Point.prototype
    // 特别说明
    B.prototype.constructor === B
    // 是B本身，一个类的原型的构造器都应该指向自身
```

### 总结关系图如下
![img](clipboard_4.png)

为什么会有这样的结论，下面给出实际的论证:

### 实际论证
在控制台分别打印console.dir(),这里就不上图了
#### new Array()
打印一个数组对象的值，constructor是封装在class内部的

#### new Array().constructor
打印一个数组对象的constructor，就是Array本身

#### Array.prototype
打印一个数组类的prototype, 是该类的原型
打印new Array().\_\_proto\_\_的结果也是如此，此处不再重复截图

#### new Array().prototype
一个数组对象没有prototype属性

有兴趣的小伙伴可以自己试一试

一个更加详尽的关系图
![img](clipboard_5.png)
所有的原型链最终都指向Object，而Object.prototype./_/_proto/_/_ === null原型链结束

### 应用

* 添加方法或者属性
从上面的dir，可以看出，Array类的prototype保存的是数组的方法和属性
所以我们可以在prototype中直接添加
``` javascript
Array.prototype.sayName = () => {...}
// 也可以对NodeList数组(querySelectorAll)调用数组方法
Array.prototype.map(arr, function() {})
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

## 继承的几种方式
- 链式(类)继承方式
``` bash
function SuperClass(number) {
    this.name = ['s','u']
    this.number = number
    this.outName1 = function() {
        console.log(this.number, this.name)
    }
}
SuperClass.prototype.outName2 = function() {
    console.log(this.number, this.name)
}

function SubClass() {}
** SubClass.prototype = new SuperClass(1) **

const sub1 = new SubClass()
const sub2 = new SubClass()
sub1.outName2() // 1, ['s', 'u']
sub2.outName2() // 1, ['s', 'u']
sub1.name.push('b')
sub1.number = 2
sub1.outName2() // 2, ['s', 'u', 'b']
sub2.outName2() // 1, ['s', 'u', 'b']
```
上述就是链式继承的方法,即通过prototype实现继承,SubClass继承了SuperClass的构造器内的属性和prototype上的属性

缺点：上面的实验也说明了,对,就是父类的引用类型对于子类的所有对象都是共享的,这是因为子类对象的this都是指向同一个该引用类型的地址

- 伪类(构造器)继承
为了解决上述的问题
``` bash
function SuperClass(number) {
    this.name = ['s','u']
    this.number = number
    this.outName1 = function() {
        console.log(this.number, this.name)
    }
}
SuperClass.prototype.outName2 = function() {
    console.log(this.number, this.name)
}

** function SubClass(number) {
    SuperClass.apply(this, number)
} **

const sub1 = new SubClass()
const sub2 = new SubClass()
sub1.outName1() // 1, ['s', 'u']
sub2.outName1() // 1, ['s', 'u']
sub1.name.push('b')
sub1.number = 2
sub1.outName1() // 2, ['s', 'u', 'b']
sub2.outName1() // 1, ['s', 'u']
sub1.outName2() // error
```
构造器继承即是将SubClass的this都拿到SuperClass中跑一遍,这样SubClass也实现了SuperClass的constructor内的属性,至于引用类型,每个对象也指向不同的地址了。

缺点：由于只是跑了一遍constructor,所以很明显,这种继承方式无法继承prototype上的属性。

- 组合继承
``` bash

function SubClass(number) {
    SuperClass.apply(this, number)
}
SubClass.prototype = new SuperClass()

```
上面两种方法都有互补,也有各自的缺陷,所以转念一想,结合一下不就行了吗。

缺点：调用了两次父类的constructor,开销问题。

- 寄生式继承
``` bash

function SubClass(number) {
    SuperClass.apply(this, number)
}
SubClass.prototype = SuperClass.prototype
SubClass.prototype.constructor = SubClass

```
有问题解决问题,既然构造器继承无法继承父类的prototype属性,那么我们就直接把父类的prototype赋值给子类的prototype就行。

需要注意的是,这样会导致子类的constructor不指向本身了,所以需要手动调过来

- es6 -> extends
强大的es6,这里就不详细说了

需要说明的是,这种继承子类是没有this属性的,所以需要在constructor中调用super()继承父类的this。