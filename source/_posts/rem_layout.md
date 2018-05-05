---
title: rem适配
date: 2018-04-21 21:00:08
tags: rem适配
---

# rem适配

本文解决的问题：
- 遇见问题的场景
- apple官网的解决方案
- rem布局
- vw布局
- scrollreveal库推荐

<!-- more -->

## 遇见问题的场景
了解到rem布局是因为最近在做官网，需求是全屏布置。
- 自己在做之前也思考了一下对于不同屏幕的字体大小、图标大小等问题
布局有很多种类，如流动布局、媒体查询、栅格化等等
（因为是全屏布置的，大屏大到1920px，小到1240px，还有移动端，若是字体设为固定值，总会有不美的地方，而这个UI设计也是不会给出具体什么屏幕对应什么值的）

## apple官网的解决方案
采用了媒体布局media:
media阈值：1044px 767px；不同的阈值下部分布局、图片都不同。
有趣的是在mobile：当窗口小于320px左右时，是对整个页面进行了整体的缩放(暂时没弄明白其方案)

## rem布局
What：
- 全名：font size of the root element,即相对根元素html的字体大小。
- 所以我们需要在根元素html设置字体大小，这个字体大小是根据浏览器窗口大小计算出来的。
- 然后在需要根据窗口大小变化的元素上设置rem单位的值

Why：
优点：灵活性好，可以设定html字体大小一个阈值(相对vw的不可控)

缺点：在pc端的浏览器中，浏览器窗口可以灵活的缩放，但是该方案只有重新加载计算才会更新页面(所以我认为可能更加适合移动端的浏览器--设置viewport使其不能缩放)

How：

UI设计图为1920px宽度为准（移动端设计图一般为750px），因为用户浏览器宽度未知，所以需要根据其值设置：
- 在mounted钩子函数中设置html元素font-size为相对默认16px大小的百分比，单位为%（除以10是为了规避最终结果小数点太多）
``` bash
   const el = document.querySelector('html')
   el.style.fontSize = `${(width * 100) / (10 * 16)}%`
```
- 利用sass创建一个工具函数px2rem
``` bash
@function px2rem($px){
    $rem : 192px; // '1920/10':分成10份
    @return ($px/$rem) + rem;
}
```
- 在#app中设置font-size: 16px，避免html的font-size对整体字体大小的影响
``` bash
#app {
    font-size: 16px;
}
```
- 元素的宽度、字体大小等需要自适应的使用px2rem
``` bash
.box1 {
  width: px2rem(320px);
 }
```

## vw布局
What：浏览器将窗口宽度分为了100份，即其中的1份就是1vw的值。

Why：
优点：会随着浏览器窗口缩放，元素大小也会动态变化

缺点：没有阈值，除非设定特殊逻辑。

How：
不需要额外的计算，直接在元素上以vw为单位
这里推荐[postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport)npm插件，可以全局替换所有的指定单位

## scrollreveal库推荐
What：
[scrollreveal](https://github.com/jlmakes/scrollreveal)是一个在web和mobile端的简易滚动动画库。

Why：
优点：
- 十分适合尤其是官网的动画效果。动画效果包含：各种transform变换、延时、opacity、反复/首次执行、动画回掉函数等
- 3.3KB轻量级

缺点：不能对设置了transform的元素使用，会导致其原本的transform失效(因为它本身会对元素做transform处理)

How：
根据类名来设置：
``` javascript
// Changing the defaults
window.sr = ScrollReveal({ reset: true });

// Customizing a reveal set
sr.reveal('.reveal__scroll', { duration: 200 });

// 配置项：
{
    // 'bottom', 'left', 'top', 'right'
    origin: 'bottom',

    // Can be any valid CSS distance, e.g. '5rem', '10%', '20vw', etc.
    distance: '20px',

    // Time in milliseconds.
    duration: 500,
    delay: 0,

    // Starting angles in degrees, will transition from these values to 0 in all axes.
    rotate: { x: 0, y: 0, z: 0 },

    // Starting opacity value, before transitioning to the computed opacity.
    opacity: 0,

    // Starting scale value, will transition from this value to 1
    scale: 0.9,

    // Accepts any valid CSS easing, e.g. 'ease', 'ease-in-out', 'linear', etc.
    easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',

    // `<html>` is the default reveal container. You can pass either:
    // DOM Node, e.g. document.querySelector('.fooContainer')
    // Selector, e.g. '.fooContainer'
    container: window.document.documentElement,

    // true/false to control reveal animations on mobile.
    mobile: true,

    // true:  reveals occur every time elements become visible
    // false: reveals occur once as elements become visible
    reset: false,

    // 'always' — delay for all reveal animations
    // 'once'   — delay only the first time reveals occur
    // 'onload' - delay only for animations triggered by first load
    useDelay: 'always',

    // Change when an element is considered in the viewport. The default value
    // of 0.20 means 20% of an element must be visible for its reveal to occur.
    viewFactor: 0.2,

    // Pixel values that alter the container boundaries.
    // e.g. Set `{ top: 48 }`, if you have a 48px tall fixed toolbar.
    // --
    // Visual Aid: https://scrollrevealjs.org/assets/viewoffset.png
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },

    // Callbacks that fire for each triggered element reveal, and reset.
    beforeReveal: function (domEl) {},
    beforeReset: function (domEl) {},

    // Callbacks that fire for each completed element reveal, and reset.
    afterReveal: function (domEl) {},
    afterReset: function (domEl) {}
}
```