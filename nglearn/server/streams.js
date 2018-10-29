const fs = require('fs');
function app(req,res) {
    const filename = req.url.slice(1);
    const filestream = fs.createReadStream(filename, {encoding: 'utf-8'});
    let result = '';
    filestream.on('data', chunk => {
        result += chunk;
    });
    filestream.on('end', () => {
        res.end(result);
    });
    filestream.on('error', () => {
        res.statusCode = 500;
        res.end('Something went wrong')
    })
}
function app1(req, res) {
    const filename = req.url.slice(1);
    const filestream = fs.createReadStream(filename, {encoding: 'utf-8'});
    filestream.on('data', chunk => {
        res.write(chunk);
    });
    filestream.on('end', () => {
        res.end();
    });
    filestream.on('error', () => {
        res.statusCode = 500;
        res.end('Something went wrong')
    })
}

function app2(req, res) {
    const filename = req.url.slice(1);
    const filestream = fs.createReadStream(filename, {encoding: 'utf-8'});
    filestream.pipe(res);
    filestream.on('error', () => {
        res.statusCode = 500;
        res.end('Something went wrong')
    })
}