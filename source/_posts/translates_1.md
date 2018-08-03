---
title: 翻译文章
date: 2018-05-07 13:49:38
tags: 翻译系列
---

# 以下是ECMAScript2016、ECMAScript2017和ECMAScript2018中所有新特性的例子

翻译系列
[原文连接](https://medium.freecodecamp.org/here-are-examples-of-everything-new-in-ecmascript-2016-2017-and-2018-d52fa3b5a70e)(ps：需要翻墙)

![img](translates_1_1.jpg)

<!-- more -->

对于保持跟进JavaScript(ECMAScript)中的新内容是困难的，并且更难的是找到有用的代码示例。

所以在这篇文章，我将介绍被[TC39采纳的建议](https://github.com/tc39/proposals/blob/master/finished-proposals.md)并且添加在ES2016、ES2017和ES2018 (final draft)中的所有18项功能，并向展示它们一些有用的例子。

> 这是一个很长的文章但是易于读。想象这篇文章为“Netflix binge reading。”在篇文章的最后，我保证你会收获大量关于这些功能的知识。

好, 让我们一个一个认识它们.

![ECMAScript](translates_1_2.png)

# ECMAScript 2016
## Array.prototype.includes
includes是Array上一个十分简单的实例方法，并且有助于快速找到一个item是否在Array中(包括NaN不像IndexOf那样)

![ECMAScript 2016 or ES7 — Array.prototype.includes()](translates_1_3.png)

> 趣事：JavaScript规范人员想要命名它为contains，但是这个早已被Mootools使用了，所以他们使用了includes。

## Exponentiation infix operator(乘方中缀操作符)
数学操作符中的加法和减法分别拥有中缀操作符+和-。类似的，中缀操作符**通常被用作指数操作符。在ECMAScript 2016中，**被Math.pow()代替。
![Exponentiation infix operator](translates_1_4.png)


![ECMAScript 2017](translates_1_5.png)

# ECMAScript 2017
## Object.values()
Object.values()是一个类似于Object.keys()的新方法，但是返回的是对象中不包括原型链的值。
![ECMAScript 2017 (ES8)— Object.values()](translates_1_6.png)

## Object.entries()
Object.entries()跟Object.keys()有关，但是不同于仅返回键名，该方法以数组的形式返回所有的键名和键值。这使得它做像在循环中使用对象或者将对象转化为映射十分简单。
Example 1:(for of 中使用)
![ECMAScript 2017 (ES8) — Using Object.entries() in loops](translates_1_7.png)

Example 2:(new Map()中使用)
![ECMAScript 2017 (ES8) — Using Object.entries() to convert Object to Map](translates_1_8.png)

## String padding
两个实例方法被添加到String对象--分别是String.prototype.padStart 和 String.prototype.padEnd--允许在原字符串的首端或者末端添加在空字符串或者其他字符串。
``` javascript
// 语法
'someString'.padStart(numberOfCharcters [,stringForPadding]);
// 示例 
'5'.padStart(10) // '          5'
'5'.padStart(10, '=*') //'=*=*=*=*=5'
'5'.padEnd(10) // '5         '
'5'.padEnd(10, '=*') //'5=*=*=*=*='
```
> 当我们想要显示漂亮的打印或者终端打印的场景下，这就十分有用了

### padStart example:
在开始下面的实例之前，我们准备一个长度可变的number[]。我们打算在首端预置0，这样就所有的item就都显示出10个数字的长度。我们可以使用`padStart(10, '0')`来简单实现。
![ECMAScript 2017 — padStart example](translates_1_9.png)

### padEnd example:
`padEnd`真正的有用的地方是，当我们想以右对齐打印一个包含多个项且长度可变的数组的值的时候。

下面的实例很好的展示了如何同时使用`padEnd`、`padStart`，和`Object.entries()`去产生一个漂亮的输出。
![ECMAScript 2017 — padEnd, padStart and Object.Entries example](translates_1_10.png)

``` javascript
const cars = {
  '🚙BMW': '10',
  '🚘Tesla': '5',
  '🚖Lamborghini': '0'
}
Object.entries(cars).map(([name, count]) => {
  //padEnd appends ' -' until the name becomes 20 characters
  //padStart prepends '0' until the count becomes 3 characters.
  console.log(`${name.padEnd(20, ' -')} Count: ${count.padStart(3, '0')}`)
});
//Prints..
// 🚙BMW - - - - - - -  Count: 010
// 🚘Tesla - - - - - -  Count: 005
// 🚖Lamborghini - - -  Count: 000
```

### ⚠️padStart and padEnd on Emojis and other double-byte chars(padStart和padEnd作用在表情符号和其他双字节字符)
表情符号和其他双字节符号使用多个字节的unicode表示，所以padStart和padEnd可能不会表现的如预期一般。

举个例子：让我们来尝试将用❤️表情符号将字符串'heart'填充到10个字节。结果将会看起来是下面这样：
     
> 注意这里不是5颗心，而是只有两颗心和一颗看起来很奇怪的心。
 'heart'.padStart(10, "❤️"); // prints.. '❤️❤️❤heart'
     
这是因为❤️是2个字节长('\u2764\uFE0F' )! 单词heart本身有5个字符，所以我们只能在左边填充5个字符。所以这就是为什么JS使用'\u2764\uFE0F'填充两颗心会生成❤️❤️的原因。对于最后一个心，它只是使用了心字符的第一个字节\u2764所以生成了❤。
     
所以我们的结果是: ❤️❤️❤heart

PS: 你可以使用此[连接](https://encoder.internetwache.org/#tab_uni)来检测unicode字符转换。

个人批注：若字符串的长度大于等于numberOfCharcters时，返回的结果是原字符串。

## Object.getOwnPropertyDescriptors
该方法返回给定对象上所有属性的细节（包括getter和setter方法）。添加该方法的主要动机是允许浅拷贝/复制一个对象到另一个对象的同时也可以将getter和setter方法拷贝，不像Object.assign。

**Object.assign浅拷贝原对象除了getter和setter方法的所有属性。**

下面的例子展示了分别使用`Object.assign`和`Object.getOwnerPropertyDescriptors`连同`Object.defineProperties`一起来拷贝原对象`Car`到一个新的对象`ElectricCar`。你将会发现，通过使用`Object.getOwnerPropertyDescriptors`将`discount`属性的getter和setter方法同样拷贝到了目标对象。

BEFORE...

![Before — Using Object.assign](translates_1_11.png)

AFTER...

![ECMAScript 2017 (ES8) — Object.getOwnPropertyDescriptors](translates_1_12.png)

## Add trailing commas in the function parameters(在函数参数的末尾中添加逗号)
这是一个小更新，允许在函数参数的末尾添加逗号。为什么这样呢？这是为了像git这样的工具更好的管理代码。

下面的例子展示了问题和解决方案。
![ECMAScript 2017 (ES 8) — Trailing comma in function parameter](translates_1_13.png)

> Note:你同样可以整个函数的参数都是用末尾逗号

## Async/Await
如果你问我这是什么，我会告诉你这是到目前为止最重要并且最有用的部分。Async函数使我们不用去处理回调地狱了，并且使整个代码看起来很简洁。

`async`关键字告诉JavaScript编译器以不同于一般函数来对待。当编译器遇到`await`关键字后面跟着一个`async`标名的函数时会暂停。编译器会假定`await`关键字后面的函数会返回一个promise对象，并且直到该promise被resolved或者rejected再进一步执行。

在下面的例子中，`getAmount`函数执行了两个异步函数`getuser`和`getBankBalance`。我们可以在promise中这样做，但是使用`async await`会更加的优雅和简单。
![ECMAScript 2017 (ES 8) — Async Await basic example](translates_1_14.png)

### Async functions themselves return a Promise(Async函数自身返回一个Promise)
如果你正在等待Async函数的结果，你需要使用`then`语法去捕获这个结果。

在下面的例子中，我们希望使用`console.log`来打印这个结果,但是却不是在doubleAndAdd函数中操作。所以我们希望等待并且使用`then`语法来传递结果给`console.log`。
![ECMAScript 2017 (ES 8) — Async Await themselves returns Promise](translates_1_15.png)

### Calling async/await in parallel(并行调用async/await)
在前面的例子中我们调用了两次await，但是每一次我们都等待了1s(总共2s)。然而我们可以通过使用Promise.all并行实现得到`a`和`b`，而且相互之间不会依赖对方。
![ECMAScript 2017 (ES 8) — Using Promise.all to parallelize async/await](translates_1_16.png)


### Error handling async/await functions
当我们使用async/await时，这里有多种方式来处理错误。

#### Option 1 - Use try catch within the function(在函数中使用try catch)
![ECMAScript 2017 (ES 8) — Use try catch within the async/await](translates_1_17.png)

#### Option 2 - Catch every await expression(使用catch捕获所有的await)
![ECMAScript 2017 (ES 8) — Use try catch every await expression](translates_1_18.png)

#### Option 3 - Catch the entire async-await function(在整个async-await函数外部捕获)
![ECMAScript 2017 (ES 8) — Catch the entire async/await function at the end](translates_1_19.png)

![ECMAScript 2018](translates_1_20.png)

# ECMAScript 2018

> ECMAScript 2018目前正在最终草案中，将于2018年6月或者7月发布。下面介绍的所有功能都在stage-4中，将是ECMAScript 2018的一部分。

> 个人科普：ECMAScript中的功能发布流程TC39 process大致为：stage-0，strawman，接受成员和注册的非成员的提议；stage-1，proposal，功能的正式提案；stage-2，draft，规范草案，最终的规范中可能会包含该功能；stage-3，candidate，开发者反馈；stage-4，finished，最终完成。一共经历5个部分。

## Shared memory and atomics()
这是一个十分高级的特性，也是JS引擎的增强。

**主要思想是为了为JavaScript提供某种多线程功能，以便JS开发者可以通过自己管理内存来编写高性能的并发程序，而不是通过JS引擎管理内存。**

这是通过一种名为[SharedArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer)的新型全局对象实现的，它基本上将数据存储在共享内存空间。所以这里的数据就能被JS主要的线程和web-worker的线程所共享。

直到现在，如果我们想要在JS主要的线程和web-worker的线程共享数据，我们必须通过`postMessage`将拷贝的数据发送到其他线程，别无他法！

你只需要使用ShareArrayBuffer，所有的主线程和多个web-worker线程就可以共享数据。

但是在线程中共享内存可能会导致资源竞争的状况。为了避免这种情况，一个全局对象["Atomics"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics)产生了。当一个线程在使用数据时，Atomics提供了多种方法来锁定该部分共享的内存。它还提供了安全更新共享内存中数据的方法。

> 建议通过某个库使用此功能，但是现在还没有构建在此功能之上的库。

如果你感兴趣，我推荐阅读:
1. [From Workers to Shared Memory](http://lucasfcosta.com/2017/04/30/JavaScript-From-Workers-to-Shared-Memory.html) — [lucasfcosta](http://lucasfcosta.com/)
2. [A cartoon intro to SharedArrayBuffers](https://hacks.mozilla.org/category/code-cartoons/a-cartoon-intro-to-sharedarraybuffers/) — [Lin Clark](https://medium.com/@linclark)
3. [Shared memory and atomics](http://2ality.com/2017/01/shared-array-buffer.html) — [Dr. Axel Rauschmayer](http://rauschma.de/)

单词收集：

| Word  | Mean |
| ------------- | ------------- |
| commas  | 逗号  |
| syntax  | 语法  |
| capture  | 捕获  |
| threads | 线程 |