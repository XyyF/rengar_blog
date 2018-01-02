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

## git分区
git有4个区域，本地的工作区、暂存区、本地仓库区，远程的远程仓库区
- 工作区：我们平时开发代码所在的区域，是直接呈现在我们面前的
- 暂存区：git add就是将工作区的代码提交到暂存区，用来保护数据，以免错误提交
- 本地仓库区：git commit将暂存区代码提交到这里，如字面意思，就是一个用来在本地存放代码的仓库
- 远程仓库区：git push将本地仓库代码提交到这里，是一个远程的存放代码的仓库，用于保存、部署代码等...

## git的头指针
git对于每一个分支都有一个HEAD指针，这个指针指向当前分支最新的状态(版本号，每一次提交都会有一个对应的版本号，指针就是指向这个版本号)

![img](git_head_1.png)
一个简短的git开发流程

![img](git_head_2.png)
现在需要开发一个新的独立的功能，在master拉取一个新的分支iss53

![img](git_head_3.png)
你现在在iss53开发时，但你的同事在其他工作环境发现master有紧急的bug
git checkout master
git branch hotfix
在master分支上新建一个分支hotfix

![img](git_head_5.png)
同事把bug解决测试完毕后，需要合并到master
git checkout master
git merge hotfix
这种情况（master和hotfix的公共祖先就是master）相当与把master的HEAD指针推进（fast forward）到hotfix分支的HEAD处
git branch -d hotfix #删除hotfix分支

![img](git_head_6.png)
最后你在iss53分支上的功能开发完毕，需要合并到master
git checkout master
git pull origin master
因为你在开发iss53时，你的同事将远程仓库master的HEAD指针向前推进了，你需要将本地仓库的HEAD指针更新到远程仓库状态

![img](git_head_7.png)
这种情况（master和iss53的公共祖先不是其中一个），这时，会对当前两个分支的末端和公共祖先进行简单的三方合并计算

![img](git_head_8.png)
最后重新产生一个分支，使master的HEAD指针指向该提交内容，而iss53的HEAD不会动，因为merge的对象是master，只有master会改变
最后再git push提交到远程仓库即可

## 一些git的常用操作：
``` bash
gitk --all &  #打开git的图形化界面,这个跟WebStorm的Version Control一样
// 初始化-创建本地仓库
git init  #初始化文件为本地的仓库
// 拷贝代码
git remote add origin ssh  #和远程库建立连接，添加远程仓库地址
git remote -v  #查看远程repo的地址
git clone ssh  #复制远程库的代码到本地库
// 提交
git add .  #将所有修改过的工作文件提交暂存区
git commit -m "注释"  #把暂存区的内容提交到本地库（如果本地不commit的话，修改的纪录可能会丢失。）
git commit -a -amend  #对最近的一次commit注释进行修改
git push -u origin master  #第一次推送到远程库的master分支(-u代表初始化远程repo)
git push origin master  #以后的推送
git push origin <local-branch>  #推送本地分支到远程分支，远程分支跟本地同名(推送前，没有该命名的远程分支)
git push origin <local-branch>:<remote-branch>  #推送本地分支到远程分支，并命名远程分支(推送前，没有该命名的远程分支)
git push origin :<remote-branch>  #删除远程分支（可以先git branch -d <local-brach>删除本地分支）

// 回退版本
git reset <version-head>  #
git revert <version-head>  #
git checkout <version-head>  #

// 查看工作区、暂存区状态
git status #查看工作区是否还有文件未提交
git stage #查看暂存区是否还有未提交

// 清除操作
git reset HEAD  #清空暂存区的内容(可以清空add的内容)
git clean  #用于清空工作区的所有未被tracked的文件
    两者经常结合使用，因为git reset HEAD只影响呗tracked的文件。两者一起使用就可以使工作区完全回到一个commit的状态

// 对分支的操作
git branch <name>       #在本地创建一个新的分支，这个分支是当前所在分支内容的副本
git checkout <name>     #切换到分支
git branch              #查看本地分支，带*为自己所在分支
git branch -a           #查看所有分支（本地+远程）(-a代表all)
git branch --merge      #查看所有合并到了当前分支的分支
git branch --no-merge   #查看所有未合并到了当前分支的分支
git branch -d <name>    #删除分支(-d代表delete)
git checkout -b rengar  #相当于git branch rengar;git checkout rengar的缩写(-b代表new branch;)
git checkout -b rengar -t origin/master  #基于远程master分支,创建本地分支rengar,并checkout

# 新建远程分支-先建立本地分支-再git push origin <name>即可

git log #查看提交的各个版本

// 合并
git merge <branch> #将branch分支合并到当前分支
git merge origin/<branch> #将远程库的branch分支合并到当前分支

// 拉取代码
git pull #将远程库所有分支的更新合并到本地库，就是getch+merge的综合操作
git fetch --all #会创建一个FETCH_HEAD指针，指向远程仓库的某个branch的最新状态。、

    这个指针不会在本地创建分支，也不会更新本地的文件
    如果没有显示地指定远程分支，则远程分支的master将作为默认的FETCH_HEAD
    再合并git merge FETCH_HEAD即可（将工作区和本地仓库和FETCH_HEAD合并）

git fetch --all
git reset --hard origin/master
git pull  #强制pull覆盖本地文件

// tag标签-常用于版本发布
git tag给当前工作区打上标签，给某个时间点的版本做标记
git tag v1.0 #给当前的工作区内容打上tag: v1.0
git tag -a v1.0 -m "" #-a tag名，-m 注释
git tag #查看所有tag
git tag -l "" #搜索tag
git checkout <tagname> #切换到tag,这是HEAD指针指向这个tag的版本号
git tag -d v1.0 #删除标签
git tag v1.1 <版本号(git log可以得到)> #给以前发布的版本打上标签
git push origin v1.0 #tag需要单独提交(push不会提交tag)
git push origin --tags #提交所有的tags

// 用户名
git config --global user.name #用户名
git config --global user.email #邮箱

// 别名，好的别名可以帮助开发
git config --global alias.ci commit  #等等，都可以以这种方式
```

小知识：在html预览github的某个html文件：htmlpreview.github.io/?地址
