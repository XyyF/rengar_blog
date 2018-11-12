---
title: 获取IOS APP的图片资源
date: 2018-11-12 15:46:44
tags:
---

# 获取IOS APP的图片资源

<!-- more -->

1. 下载APP包
![img](1.jpg)

2. 右键显示包内容
![img](2.jpg)

3. 在包中，可以找到项目启动的部分资源，但是项目内的资源需要找到Assets.car文件
![img](3.jpg)

4. 解压.car文件

下载工具cartool，gitHub链接：https://github.com/steventroughtonsmith/cartool

使用xcode编辑器打开cartool工程文件，选中product -> Scheme->Edit Scheme
![img](4.jpg)

然后选中Run -> Arguments -> Arguments Passed On Launch，需要输入两个地址，第一个地址为.car文件的地址，第二个地址为解析后资源的位置

最后运行product -> run运行项目

5. 解析后的资源就可以拿到了