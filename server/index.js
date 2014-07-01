/*
* 依赖
* */
var express = require('express');
var logger = require('morgan');
var app = express();

//数据库部分
var myDb = require('./mydb');
var textModel = myDb.textModel();
//连接数据库
myDb.connect();

app.use(logger());
app.use('/', express.static(__dirname + './../app'));
//app.get('/', function(req, res){
//    res.send('app/index.html');
//});

app.get('/list', function (req, res) {
    textModel.find({}, null, {limit : 10, sort: {_id : -1}}, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            var blogs = docs;
            res.send(blogs);
            console.log(docs);
        }
        });
});
app.listen(3000);