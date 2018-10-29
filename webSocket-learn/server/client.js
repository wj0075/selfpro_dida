const ws = require('ws');

// 创建一个客户端的socket,然后让这个客户端去连接服务器的socket

const sock = new ws('ws://127.0.0.1:8081');

sock.on('open',() => {
    console.log('connect success!!!');
    sock.send('Hello Word 1');
});

sock.on('error', (err) => {
    console.log('error', err);
});

sock.on('message', (data)=> {
    console.log('message',data);
});