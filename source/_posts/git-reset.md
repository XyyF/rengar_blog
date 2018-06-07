---
title: git reset
date: 2018-06-07 09:07:49
tags: git
---

# git reset命令

本文解决的问题：
- git reset的含义
- git reset的参数含义
- git reset的使用

<!-- more -->

## git reset的含义

git reset不会产生新的分支，它是将分支的状态和HEAD重置到一个存在的commit上，这对work、stage、commit都有可能产生影响。

## git reset的参数

### --mixed(default)，将内容保存至work
- 这个是git reset的默认参数。
- 该参数会使HEAD指向这次commit，这次commit(不包含本次commit)到顶端的所有内容都将保存到**work**中，commit和stage分区清空。
- 如果在执行命令前，stage暂存区有内容，那么执行命令后，暂存区的内容将到work工作区中。（所以为什么git reset HEAD可以清空暂存区的内容）

### --soft，将内容保存至stage，但不影响work的内容
- 该参数告诉git仅仅将HEAD重置到该commit上，而这次commit(不包含本次commit)到顶端的所有内容都将到**stage**中，其中的commit提交记录在commit链消失。
- 如果在执行命令前，stage暂存区有内容，那么执行命令后，暂存区的内容仍然还在暂存区中.
- 如果执行命令前，work工作区有内容，那么执行命令后，work区的内容仍然在work区。

### --hard，清空所有内容，包括work和stage
- 该参数将会blow out everything，这次commit到顶端的所有内容都将丢失(包括执行命令时存在于work、stage中的内容)，此时work、stage、commit都是相同的状态。

## git reset的使用
- git reset HEAD
该命令使HEAD重置到当前的分支的顶端，同时也可用来清除stage的内容
- git reset HEAD~1
将HEAD重置到当前分支前一次commit提交处。当然也可以使用git reset HEAD~2
- git reset commit-id
将HEAD重置到指定commit-id的提交处。