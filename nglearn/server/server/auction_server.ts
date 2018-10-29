import * as express from 'express';
import  {Server} from 'ws';
const app = express();
export class Products {
    constructor(
        public id: number,
        public title: string,
        public price: number,
        public rating: number,
        public desc: string,
    ) {}
}
const products: Products[] = [
    new Products(1, '第一个商品', 1.99, 3.5, '这是第一个商品,是'),
    new Products(2, '第二个商品', 2.99, 4.5, '这是第二个商品,是'),
    new Products(3, '第三个商品', 3.99, 2.5, '这是第三个商品,是'),
];

app.get('/', (req, res) => {
   res.send("Hello Express");
});

app.get('/products', (req, res) => {
   // res.send('接收到商品查询请求')
    res.json(products);
});
app.get('/products/:id', (req, res) => {
    res.json(products.find(product => product.id == req.params.id));
});

const server = app.listen(8000, "localhost", () => {
   console.log("服务器已启动，地址是：http://localhost:8000");
});

const wsServer = new Server({port: 8085});
wsServer.on('connection', websocket => {
   websocket.send("这个消息是服务器主动推送的:");
   websocket.on('message', message => {
       console.log('接收到消息'+message);
   })
});

setInterval(() => {
    if(wsServer.clients) {
        wsServer.clients.forEach(client => {
            client.send('这是定时推送')
        })
    }
}, 2000);