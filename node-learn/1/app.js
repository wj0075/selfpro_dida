// const http = require('http');
const hostname = 'localhost';
const port = 3000;
const express = require('express');
const app = express();
const formidable = require('formidable');
const bodyParser = require('body-parser');
const fs = require('fs');
const multiparty = require('multiparty');
// var multipart = require('connect-multiparty');
// var multipartMiddleware = multipart();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('upload'));
app.get('/', (req, res) => {
    res.send('请求成功~~ 你好');
 });
 app.post('/put', function(req, res, next) {
     console.log(req.body);
     console.log(req.files);
     const form = formidable.IncomingForm({
         encoding : 'utf-8',//上传编码
         uploadDir : "public/files",//上传目录，指的是服务器的路径，如果不存在将会报错。
         keepExtensions : true,//保留后缀
         maxFieldsSize : 2 * 1024 * 1024//byte//最大可上传大小
     });
     var allFile=[];
     form.on('progress', function(bytesReceived, bytesExpected) {//在控制台打印文件上传进度
         var progressInfo = {
             value: bytesReceived,
             total: bytesExpected
         };
         console.log('[progress]: ' + JSON.stringify(progressInfo));
         res.write(JSON.stringify(progressInfo));
     })
         .on('file', function (filed, file) {
             allFile.push([filed, file]);//收集传过来的所有文件
         })
         .on('end', function() {
             res.end('上传成功！');
         })
         .on('error', function(err) {
             console.error('上传失败：', err.message);
             next(err);
         }) .parse(req,function(err, fields, files){
         if(err){
             console.log(err);
         }
         allFile.forEach(function(file,index){
             var fieldName=file[0];
             var types = file[1].name.split('.');
             var date = new Date();
             var ms = Date.parse(date);
             fs.renameSync(file[1].path,form.uploadDir+"/"+types[0]+"."+String(types[types.length-1]));//重命名文件，默认的文件名是带有一串编码的，我们要把它还原为它原先的名字。
         });
     });

     /*const form = new multiparty.Form();
      form.uploadDir='upload';
      form.parse(req, function(err, fields, files) {
          //获取提交的数据以及图片上传成功返回的图片信息
          console.log(fields);  //获取表单的数据
          console.log(files);  //图片上传成功返回的信息
          // var username=fields.username[0];   //表单字段获取
          // var pic=files.pic[0].path;   //获取文件保存的目录
          //console.log(pic);
      });*/
   /* return;
    console.log('hello', req.files);
    console.log(req.body);
    var tmp_path = req.body.test.path;
    var target_path = './public/' + req.body.filename;

    fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // 删除临时文件夹文件, 
        fs.unlink(tmp_path, function() {
           if (err) throw err;
           res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
        });
      });*/
  });
 const server = app.listen(port, hostname, () => {
    console.log("服务器已启动，地址是：http://localhost:3000")
});