"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var ws_1 = require("ws");
var app = express();
var Products = /** @class */ (function () {
    function Products(id, title, price, rating, desc) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
    }
    return Products;
}());
exports.Products = Products;
var products = [
    new Products(1, '第一个商品', 1.99, 3.5, '这是第一个商品,是'),
    new Products(2, '第二个商品', 2.99, 4.5, '这是第二个商品,是'),
    new Products(3, '第三个商品', 3.99, 2.5, '这是第三个商品,是'),
];
app.get('/', function (req, res) {
    res.send("Hello Express");
});
app.get('/products', function (req, res) {
    // res.send('接收到商品查询请求')
    res.json(products);
});
app.get('/products/:id', function (req, res) {
    res.json(products.find(function (product) { return product.id == req.params.id; }));
});
var server = app.listen(8000, "localhost", function () {
    console.log("服务器已启动，地址是：http://localhost:8000");
});
var wsServer = new ws_1.Server({ port: 8085 });
wsServer.on('connection', function (websocket) {
    websocket.send("这个消息是服务器主动推送的:");
    websocket.on('message', function (message) {
        console.log('接收到消息' + message);
    });
});
setInterval(function () {
    if (wsServer.clients) {
        wsServer.clients.forEach(function (client) {
            client.send('这是定时推送');
        });
    }
}, 2000);
