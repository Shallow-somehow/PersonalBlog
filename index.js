//主文件

var express = require('express');
var globalConfig = require('./config')
var loader = require('./loader')


// 开启服务器
var app = new express();
app.use(express.static('./page'));


//每日一句部分
app.post('/editEveryDay', loader.get('/editEveryDay'));
app.get('/queryEveryDay', loader.get('/queryEveryDay'));


//blog部分
app.post('/editBlog', loader.get('/editBlog'));
app.get('/queryBlogByPage', loader.get('/queryBlogByPage'));
app.get('/queryBlogCount', loader.get('/queryBlogCount'));

//文章详情页 
app.get('/queryBlogById', loader.get('/queryBlogById'));

//文章评论
app.get('/addComment', loader.get('/addComment'));
app.get('/queryCommentsByBlogId', loader.get('/queryCommentsByBlogId'));
app.get('/queryCommentCountByBlogId', loader.get('/queryCommentCountByBlogId'));

//验证码
app.get('/queryRandomCode', loader.get('/queryRandomCode'));

// siteMap部分
app.get('/queryAllBlog', loader.get('/queryAllBlog'));

//随机标签云
app.get('/queryRandomTags', loader.get('/queryRandomTags'));
//通过标签筛选文章
app.get('/queryByTag', loader.get('/queryByTag'));
app.get('/queryByTagCount', loader.get('/queryByTagCount'));


//热门博客
app.get('/queryHotBlog', loader.get('/queryHotBlog'));

//最新评论
app.get('/queryNewComment', loader.get('/queryNewComment'));

//总访问量
app.get('/queryAllViewsCount', loader.get('/queryAllViewsCount'));


app.listen(globalConfig.port, function () {
    console.log('服务器已启动')
})


