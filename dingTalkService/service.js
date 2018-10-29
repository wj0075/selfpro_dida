const express = require('express');
// const request = require('request');
const request = require('superagent');
const app = express();
const data = JSON.stringify({
    "msgtype": "text",
    "text": {
        "content": "马兄好~"
    },
    "at": {
        "atMobiles": false,
        "isAtAll": true
    }
});

app.get('/', (req, res) => {
   res.send('请求成功');
});
app.get('/ding_talk_send', (req, res1) => {
    // res.send('dingding');

    request.post('https://oapi.dingtalk.com/robot/send?access_token=34c72fab982c9e7c39e75217be7f0852070a4ab1736a33a2fe2c223b49b5e6f0')
        .set('Content-Type', 'application/json; charset=utf-8')
        .send(data)
        .end(res => {
            res1.send('dingding');
            console.log('返回',res)
        })
});
const server = app.listen(8000, '192.168.1.171', () => {
    console.log("服务器已启动，地址是：http://192.168.1.171:8000")
});