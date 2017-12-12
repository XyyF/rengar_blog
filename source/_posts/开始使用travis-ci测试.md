---
title: 开始使用travis-ci测试
date: 2017-12-04 21:43:19
tags: travis-ci
---

## 现在开始使用travis-ci持续集成工具

本文解决问题：
- 为什么使用travis-ci
- 如何配置travis-ci

<!-- more -->
持续集成：Continuous Integration，简称CI，即在一个项目中，任何人对代码库的任何改动，都会触发CI服务器自动对项目进行构建，自动运行测试，甚至自动部署到测试环境。这样做的好处就是，可以随时发现问题，随时修复。因为修复问题的成本随着时间的推移而增长，越早发现，修复的成本越低。

travis-ci 是一个开源持续集成构建项目,简洁清新独树一帜,是github的好基友

目的：简化流程、自动部署

只需在rengar_blog仓库git push代码后，travis-ci就会自动执行提前设置的构建流程,将hexo generate后的代码push到对应的io的repository下
 
步骤：

    - 登录travis-ci官网注册账号，并且关联github账号,主界面如下，可以在红框处选择需要构建的repositories
![img](travis-1.jpg)

    - 然后我们需要对项目进行一些配置：在repository-> 右上角的More options -> setting下,设置
![img](travis-2.jpg) 

Build only if .travis.yml is present 代表只构建目录下有.travis.yml文件的repository

Build branch updates 代表分支构update后就开始构建
    
    - 在travis-ci中配置github的access token,在自己的github账号-> settings -> Deoloyer settings -> Personal access tokens获取github的access token,添加description,权限不要着重选择delete_rep! -> 另外，access token在再次进入该页面时不会显示，这是只有重新建一个了
![img](travis-3.jpg) 

    - 同样在travis-ci的setting -> Environment Variables配置
![img](travis-4.jpg) 

    - 最后需要配置下repository目录下的.travis.yml文件
``` bash
language: node_js
node_js: stable

# S: Build Lifecycle
install:
  - npm install


#before_script:
 # - npm install -g gulp

script:
  - hexo generate

after_script:
  - cd ./public
  - git init
  - git config user.name ""
  - git config user.email ""
  - git add .
  - git commit -m "Update docs"
  - git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:master
# E: Build LifeCycle

branches:
  only:
    - master
env:
 global:
   - GH_REF: github.com/XyyF/XyyF.github.io.git
```
其中需要更换
 
GH_REF -> 你的需要提交的仓库地址

user.name 和 user.email 可以通过 git config获取

script中不需要 hexo clean和hexo deploy, 因为本地没有提交public文件，不用clean. deploy 本身就是把public目录下的文件提交到对应的repository

    - 最后，你的每次在该repository下的push都会触发构建，会有对应的打印日志
![img](travis-5.jpg) 