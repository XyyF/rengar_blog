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

### 好, 让我们一个一个认识它们.

![ECMAScript](translates_1_2.png)

## 1.Array.prototype.includes
includes是Array上一个十分简单的实例方法，并且有助于快速找到一个item是否在Array中(包括NaN不像IndexOf那样)

![ECMAScript 2016 or ES7 — Array.prototype.includes()](translates_1_3.png)

> 趣事：JavaScript规范人员想要命名它为contains，但是这个早已被Mootools使用了，所以他们使用了includes。

## 2.Exponentiation infix operator(乘方中缀操作符)
数学操作符中的加法和减法分别拥有中缀操作符+和-。类似的，中缀操作符**通常被用作指数操作符。在ECMAScript 2016中，**被Math.pow()代替。
![Exponentiation infix operator](translates_1_4.png)


![ECMAScript 2017](translates_1_5.png)
## 1.Object.values()
Object.values()是一个类似于Object.keys()的新方法，但是返回的是对象中不包括原型链的值。
![ECMAScript 2017 (ES8)— Object.values()](translates_1_6.png)

## 2.Object.entries()
Object.entries()跟Object.keys()有关，但是不同于仅返回键名，该方法以数组的形式返回所有的键名和键值。这使得它做像在循环中使用对象或者将对象转化为映射十分简单。
Example 1:(for of 中使用)
![ECMAScript 2017 (ES8) — Using Object.entries() in loops]

Example 2:(new Map()中使用)
![ECMAScript 2017 (ES8) — Using Object.entries() to convert Object to Map]

## 3.String padding
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

### 3.1 padStart example:
在开始下面的实例之前，我们准备一个长度可变的number[]。我们打算在首端预置0，这样就所有的item就都显示出10个数字的长度。我们可以使用`padStart(10, '0')`来简单实现。
![ECMAScript 2017 — padStart example]

### 3.2 padEnd example:
`padEnd`真正的有用的地方是，当我们想以右对齐打印一个包含多个项且长度可变的数组的值的时候。

下面的实例很好的展示了如何同时使用`padEnd`、`padStart`，和`Object.entries()`去产生一个漂亮的输出。
![ECMAScript 2017 — padEnd, padStart and Object.Entries example]

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

### 3.3 ⚠️padStart and padEnd on Emojis and other double-byte chars(padStart和padEnd作用在表情符号和其他双字节字符)
表情符号和其他双字节符号使用多个字节的unicode表示，所以padStart和padEnd可能不会表现的如预期一般。

举个例子：让我们来尝试将用❤️ 表情符号将字符串'heart'填充到10个字节。结果将会看起来是下面这样：
     
> 注意这里不是5颗心，而是只有两颗心和一颗看起来很奇怪的心。
 'heart'.padStart(10, "❤️"); // prints.. '❤️❤️❤heart'
     
这是因为❤️是2个字节长('\u2764\uFE0F' )! 单词heart本身有5个字符，所以我们只能在左边填充5个字符。所以这就是为什么JS使用'\u2764\uFE0F'填充两颗心会生成❤️❤️的原因。对于最后一个心，它只是使用了心字符的第一个字节\u2764所以生成了❤。
     
所以我们的结果是: ❤️❤️❤heart

PS: 你可以使用此方法来检测unicode字符转换。