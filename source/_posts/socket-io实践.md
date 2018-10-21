---
title: socket.io实践
date: 2018-10-21 15:59:46
tags: socket
---

# socket.io实践

本文解决的问题：
- 服务端配置
- 客户端配置

<!-- more -->

## 服务端：
采用nodeJs环境
``` javascript
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function (socket) {
    socket.on('login', (params) => {
        console.log(params)
    })
})

server.listen(3000)
```
广播消息：
``` javascript
// 向指定的room广播事件
socket.to(room).emit('answer', params)

// 全局广播
socket.broadcast.emit('answer', params)
```
监听客户端广播：
``` javascript
socket.on('answer', (params, callback) => {
    console.log(params)
    if (callback) callback()
})
```


## 客户端：
连接：
``` javascript
import io from 'socket.io-client/dist/socket.io'

// socket连接到的ip地址
const socket = io('http://localhost:3000')

// 监听连接成功后的回调
socket.on('connect', () => {
    socket.emit('login', {
        auth: 'rengar
    })
})
```
重连：
``` javascript
// 链接错误，重新链接
socket.on('connect_error', () => {
    socket.open()
})
```
请求：
``` javascript
socket.emit('answer', params, () => {
    console.log('callback')
})
```
监听：
``` javascript
socket.on('answer', (params) => {
    console.log(params)
})
```