---
title: transltes_1
date: 2018-05-07 13:49:38
tags: 翻译系列
---

# 以下是ECMAScript2016、ECMAScript2017和ECMAScript2018中所有新特性的例子

翻译系列
[原文连接](https://medium.freecodecamp.org/here-are-examples-of-everything-new-in-ecmascript-2016-2017-and-2018-d52fa3b5a70e)(ps：需要翻墙)

[!img](transltes_1_1.jpg)

<!-- more -->

对于保持跟进JavaScript(ECMAScript)中的新内容是困难的，并且更难的是找到有用的代码示例。

所以在这篇文章，我将介绍被[TC39采纳的建议](https://github.com/tc39/proposals/blob/master/finished-proposals.md)并且添加在ES2016、ES2017和ES2018 (final draft)中的所有18项功能，并向展示它们一些有用的例子。

> 这是一个很长的文章但是易于读。想象这篇文章为“Netflix binge reading。”在篇文章的最后，我保证你会收获大量关于这些功能的知识。

### 好, 让我们一个一个认识它们.

[!ECMAScript](transltes_1_2.png)

## 1.Array.prototype.includes
includes是Array上一个十分简单的实例方法，并且有助于快速找到一个item是否在Array中(包括NaN不像IndexOf那样)

[!ECMAScript 2016 or ES7 — Array.prototype.includes()](transltes_1_3.png)

> 趣事：JavaScript规范人员想要命名它为contains，但是这个早已被Mootools使用了，所以他们使用了includes。

## 2.Exponentiation infix operator(乘方中缀操作符)
数学操作符中的加法和减法分别拥有中缀操作符+和-。类似的，中缀操作符**通常被用作指数操作符。在ECMAScript 2016中，**被Math.pow()代替。
[!Exponentiation infix operator](transltes_1_4.png)


[!ECMAScript 2017](transltes_1_5.png)
## 1.Object.values()
Object.values()是一个类似于Object.keys()的新方法，但是却返回的是对象中不包括原型链的值。
[!ECMAScript 2017 (ES8)— Object.values()](transltes_1_6.png)
