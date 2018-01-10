---
title: http状态码
date: 2018-01-10 22:28:29
tags: http
---

# http状态码

本文解决的问题：
- http状态码
- get/post请求

<!-- more -->

## http状态码

- 1XX：指示信息-表示请求已接受，继续处理 
- 2XX：成功-表示请求已被成功接收
- 200 OK ：客户端请求成功 
- 206 Partial Content：客户发送一个带有Range头的GET请求，服务器完成了它 播放视频和音频 
- 3XX：重定向-要完成请求必须进行更进一步的操作
- 301 Move Permanently：所请求的页面已经转移至新的URL 
- 302 Found：所请求的页面已经临时转移到新的URL 
- 304 Not Modified：客户端有缓冲的文档并发出一个条件性的请求，服务器告诉客户，原来缓冲的文档还可以继续使用 
- 4XX：客户端错误-请求有语法错误或请求无法实现
- 400 Bad Request：客户端请求有语法错误，不能被服务器所理解 
- 401 Unauthorized：请求未经授权，这个状态代码必须和WWW-Authenticate报头域一起使用 
- 403 Forbidden：对被请求页面的访问被禁止 
- 404 Not Found：请求资源不存在 
- 5XX：服务错误-服务器未能实现合法的请求
- 500 Internal Server Error：服务器发生不可预期的错误原来缓冲的文档还可以继续使用 
- 503 Server Unavailable：请求未完成，服务器临时过载或当机，一段事件后恢复正常

## get与post请求

- GET参数通过URL传递，POST放在Request body中,因此GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传敏感信息
- GET在浏览器回退时是无害的，而POST会再次提交请求
- GET产生的URL地址可以被收藏，而POST不可以
- GET请求会被浏览器主动缓存，而POST不会，除非手动设置
- GET请求只能进行URL编码，而POST支持多种编码方式
- GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留
- GET请求在URL中传送的参数是有长度限制的，而POST没有长度限制
- 对参数的数据类型，GET只能请求ASCII字符，而POST没有限制