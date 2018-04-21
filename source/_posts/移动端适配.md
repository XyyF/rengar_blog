---
title: rem适配
date: 2018-04-21 21:00:08
tags: rem适配
---

# rem适配

本文解决的问题：
- 遇见问题的场景
- rem布局
- scrollreveal库推荐
https://github.com/jlmakes/scrollreveal

<!-- more -->

# 遇见问题的场景
了解到rem布局是因为最近在做官网，需求是全屏布置。
- 但自己在做之前也思考了一下对于不同屏幕的字体大小、图标大小等问题
（因为是全屏布置的，大屏大到1920px，小到1240px，若是字体设为固定值，总会有不美的地方，而这个UI设计也是不会给出具体什么屏幕对应什么值的）

# rem布局
布局有很多种类，如流动布局、媒体查询、栅格化等等

UI设计图为1920px宽度（移动端设计图一般为750px），因为用户浏览器宽度未知，所以需要根据其值设置：
- 在mounted钩子函数中设置html元素font-size为window.innerwidth / 10，单位为px（除以10是为了规避最终结果小数点太多）
``` bash
   const el = document.querySelector('html')
   el.style.fontSize = `${windo.innerWidth / 10}px`
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
- 元素的宽度、字体大小等使用px2rem
``` bash
.box1 {
  width: px2rem(320px);
 }
```