var blogDAO = require('../DAO/BlogDAO');
var respUtil = require('../util/respUtil');
var timeUtil = require('../util/timeUtil');
var tagDAO = require('../DAO/TagDAO');
var commentDAO = require('../DAO/CommentDAO');
var captcha = require('svg-captcha')
var url = require('url');


var path = new Map();

// 添加评论
function addComment(request, response) {
    var params = url.parse(request.url, true).query;
    
    commentDAO.addComment(parseInt(params.bid), parseInt(params.parent), params.parentName, params.userName, params.email, params.content, timeUtil.getTime(), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '评论成功', null));
        response.end();
    });
}

path.set('/addComment', addComment);


// 验证码
function queryRandomCode(request, response) {
    var img = captcha.create({fontSize: 50, width: 100, height: 34});
    response.writeHead(200, {'Content-Type': 'image/svg+xml'});
    response.write(respUtil.writeResult('success', '请求成功', img));
    response.end();
}

path.set('/queryRandomCode', queryRandomCode);


//评论列表
function queryCommentsByBlogId(request, response) {
    var params = url.parse(request.url, true).query;
    commentDAO.queryCommentsByBlogId(params.bid, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '请求成功', result));
        response.end();
    })


}

path.set('/queryCommentsByBlogId', queryCommentsByBlogId);

//评论总数
function queryCommentCountByBlogId(request, response) {
    var params = url.parse(request.url, true).query;
    commentDAO.queryCommentCountByBlogId(params.bid, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    })


}

path.set('/queryCommentCountByBlogId', queryCommentCountByBlogId);

function queryNewComment(request, response) {
    commentDAO.queryNewComment(5, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    })


}

path.set('/queryNewComment', queryNewComment);


module.exports.path = path;