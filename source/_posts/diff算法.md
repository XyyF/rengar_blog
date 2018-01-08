---
title: diff算法
date: 2018-01-08 22:31:27
tags: react
---

最近学习了下react的diff算法，这里写下我自己的理解。

本文解决的问题：
- 传统diff算法
- react的diff算法

<!-- more -->

# 传统的diff算法

传统的diff算法是根据LCS(最长子串算法)进行的,即对节点进行循环递归对比
Ⅰ、A文件 和 B文件通过LCS对比,找到最长的相同串,进而分为：
A-、C、A+

B-、C、B+

Ⅱ、再继续对-、+文件进行LCS对比

这种算法最大复杂度可达到O(n^3)

# react的diff算法

react的流行必然有着它的道理,其中diff算法的优化就是一个亮点

分为3类：tree diff、component diff、element diff由浅入深

## tree diff

react考虑到由于跨层级的DOM操作十分少见(不代表没有),所有react将Virtual DOM进行了层级划分,对比同一父节点下的子节点：

- 若发现子节点不见了,那么就删除这个子节点和其所有的子节点,不进行该节点的下层对比;
- 若发现子节点增加了,那么就添加这个子节点和其子节点.
(更换操作-是删除操作+新增操作)

![img](diff_1.png)

当然,若是出现了跨层级操作,react会怎么判断呢?(并不是想象的移动操作,而是删增操作)

![img](diff_2.png)

如上图,R节点发现子节点中A节点不见了,就删除这个节点;

D节点发现子节点增加了A节点,就增加A节点和其子节点;

- tree diff这一层级只是宏观的关注Virtual DOM,并不在意内部的结构改变

## component diff
由于react是基于组件开发的,所以这一层级是对于component的策略,用于判断tree diff中子节点没有变化的情况;

方法类似tree diff：
- 若发现组件没有改变,那么就继续对比;
- 若发现组件改变,那么删除这个组件,在添加新的组件;

![img](diff_3.png)

上图中,在tree diff看来子节点层级没有改变;那么看component diff看来,组件D变为了组件G,那么就删除组件D,再添加组件G。

## element diff
对同一组件下的element进行的对比策略;用于判断component diff没有变化的情;

对于这一层级的react diff,提供了3种操作：增加、删除、移动(这里有移动操作！)

![img](diff_4.png)

传统diff中:通过LCS发现A !== B,那么就会删除A再添加B,然后继续进行对比;

react发现这种策略复用性非常的不好,所以提出了优化策略：对于同一层级的元素,允许添加唯一key值做区分
![img](diff_5.png)
对于没有新增/删除的diff更新：

对新/老集合做diff发现key=b在新老集合中都存在,那么就只是移动B元素的位置,变为BADC;

然后继续diff,发现A元素位置不用移动,然后这样一直进行下去；

![img](diff_6.png)
对于有新增/删除的diff更新：
移动B -> 新增E -> C不动 -> 移动A -> 删除D

