---
title: 继承
date: 2018-01-07 15:45:49
tags: 原型链
---

讲解继承的几种实现,以及各自的缺点

本文解决的问题：
- 链式继承
- 构造器继承
- 组合继承
- 寄生继承
- es6的extends

<!-- more -->

# 继承的几种方式
- 类式继承
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
上述就是类式继承的方法,即通过new实现继承,SubClass继承了SuperClass的构造器内的属性和prototype上的属性

缺点：上面的实验也说明了,对,就是父类的引用类型对于子类的所有对象都是共享的,这是因为子类对象的this都是指向同一个该引用类型的地址

- 构造函数继承
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
构造器继承即是在子类SubClass构造函数作用域执行一次父类SuperClass的构造函数,这样SubClass也实现了SuperClass内的属性,至于引用类型,每个对象也指向不同的地址了。

缺点：由于只是执行了一次构造函数,所以很明显,这种继承方式无法继承prototype上的属性。

- 组合继承
类式继承+构造函数继承
``` bash

function SubClass(number) {
    SuperClass.apply(this, number)
}
SubClass.prototype = new SuperClass()

```
上面两种方法都有互补,也有各自的缺陷,所以转念一想,结合一下不就行了吗。

缺点：调用了两次父类的构造函数,开销问题。

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
