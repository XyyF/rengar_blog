---
title: git操作
date: 2017-12-13 21:38:14
tags: git
---

# git操作

对于git的一些理解，希望有所帮助

本文解决的问题：
- git的一些常用的操作
- git的分区
- git的头指针的移动

<!-- more -->

## 一些git的常用操作：
``` bash
git init #初始化文件为本地的仓库
git clone ssh #复制远程库的代码到本地库
git add . #将所有修改过的工作文件提交暂存区
git commit -m "注释" #把暂存区的内容提交到本地库（如果本地不commit的话，修改的纪录可能会丢失。）
git status #查看工作区是否还有文件未提交
git stage #查看暂存区是否还有未提交

git remote add origin ssh #和远程库建立连接，添加远程仓库地址
git push -u origin master #第一次推送到远程库的master分支
git push origin master #以后的推送
git branch <name> #在本地创建一个新的分支，这个分支是当前所在分支内容的副本
git branch #查看本地分支，带*为自己所在分支
git branch -a #查看所有分支（本地+远程）
git branch -d <name> #删除分支
git checkout <name> #切换到分支

# 新建远程分支-先建立本地分支-再git push origin <name>即可

git log #查看提交的各个版本

git merge <branch> #将branch分支合并到当前分支
git merge origin/<branch> #将远程库的branch分支合并到当前分支

git pull #将远程库所有分支的更新合并到本地库，就是getch+merge的综合操作
git fetch #会创建一个FETCH_HEAD指针，指向远程仓库的某个branch的最新状态。
这个指针不会在本地创建分支，也不会更新本地的文件
如果没有显示地指定远程分支，则远程分支的master将作为默认的FETCH_HEAD
再合并git merge FETCH_HEAD即可（将工作区和本地仓库和FETCH_HEAD合并）
A----C----E（master-HEAD指针）-FETCH_HEAD指针
     \
       B---D---F(dev)  （所有的git都可以用这样的示意图）

git tag给当前工作区打上标签，给某个时间点的版本做标记，常用于版本发布
git tag v1.0 #给当前的工作区内容打上tag: v1.0
git tag -a v1.0 -m "" #-a tag名，-m 注释
git tag #查看所有tag
git tag -l "" #搜索tag
git checkout <tagname> #切换到tag,这是HEAD指针指向这个tag的版本号
git tag -d v1.0 #删除标签
git tag v1.1 <版本号(git log可以得到)> #给以前发布的版本打上标签
git push origin v1.0 #tag需要单独提交(push不会提交tag)
git push origin --tags #提交所有的tags

git config --global user.name #用户名
git config --global user.email #邮箱
```

小知识：在html预览github的某个html文件：htmlpreview.github.io/?地址

## git分区
git有4个区域，本地的工作区、暂存区、本地仓库区，远程的远程仓库区
- 工作区：我们平时开发代码所在的区域，是直接呈现在我们面前的
- 暂存区：git add就是将工作区的代码提交到暂存区，用来保护数据，以免错误提交
- 本地仓库区：git commit将暂存区代码提交到这里，如字面意思，就是一个用来在本地存放代码的仓库
- 远程仓库区：git push将本地仓库代码提交到这里，是一个远程的存放代码的仓库，用于保存、部署代码等...

## git的头指针
git对于每一个分支都有一个HEAD指针，这个指针指向当前分支最新的状态(版本号，每一次提交都会有一个对应的版本号，指针就是指向这个版本号)

![img](git_head_1.png)
一个简短的git流程

![img](git_head_2.png)
现在需要开发一个新的独立的功能，在master拉取一个分支

![img](git_head_3.png)
现在在iss53开发时，发现master有紧急的bug
git checkout master
git branch hotfix
在master分支上新建一个分支

![img](git_head_5.png)
bug解决测试完后，需要合并到master
git checkout master
git merge hotfix
这种情况（master和hotfix的公共祖先就是master）相当与把master的HEAD指针推进（fast forward）到hotfix分支的HEAD处
git branch -d hotfix

![img](git_head_6.png)
最后iss53分支上的功能开发完毕，同上的合并操作

![img](git_head_7.png)
只是这种情况（master和iss53的公共祖先不是其中一个），这时，会对当前两个分支的末端和公共祖先进行简单的三方合并计算

![img](git_head_8.png)
最后重新产生一个分支，使master的HEAD指针指向该提交内容，而iss53的HEAD不会动，因为merge的对象是master，只有master会改变
