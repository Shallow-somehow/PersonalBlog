var blogDAO = require('../DAO/BlogDAO');
var respUtil = require('../util/respUtil');
var timeUtil = require('../util/timeUtil');
var tagDAO = require('../DAO/TagDAO');
var tagBlogMappingDAO = require('../DAO/TagBlogMappingDAO');
var url = require('url');


var path = new Map();


//写入博客文章
function editBlog(request, response) {
    var params = url.parse(request.url, true).query;
    var tags = params.tags.replace(/ /g, '').replace('，', ',');
    // var pureTextReg = ;

    request.on('data', function (data) {

        blogDAO.insertBlog(params.title, decodeURI(data), tags, 0, timeUtil.getTime(), function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '编辑成功', null));
            response.end();

            // 获取博客Id
            var blogId = result.insertId;

            var tagList = tags.split(',');
            for (let i = 0; i < tagList.length; i++) {
                if (tagList[i] == '') {
                    continue;
                }
                queryTag(tagList[i], blogId)
            }
        });
    });
}

path.set('/editBlog', editBlog);

// 全场最难↓

// 看数据库里有没有 
function queryTag(tag, blogId) {
    tagDAO.queryTag(tag, function (result) {
        if (result == null || result.length == 0) {
            insertTag(tag, blogId);
        } else {
            tagBlogMappingDAO.insertTagBlogMapping(result[0].id, blogId, timeUtil.getTime(), function (result) {
                return;
            })
        }
    })
}


function insertTag(tag, blogId) {
    tagDAO.insertTag(tag, timeUtil.getTime(), function (result) {
        insertBlogMapping(result.insertId, blogId);
    })
}

function insertBlogMapping(tagId, blogId) {
    tagBlogMappingDAO.insertTagBlogMapping(tagId, blogId, timeUtil.getTime(), function (result) {
        return;
    })
}


//页面展示博客
function queryBlogByPage(request, response) {
    var params = url.parse(request.url, true).query;
    blogDAO.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), function (result) {
        //过滤内容信息
        for (let i = 0; i < result.length; i++) {
            result[i].content = result[i].content.replace(/<.*?>/g, '');
            result[i].content = result[i].content.substring(0, 300);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '编辑成功', result));
        response.end();
    })
}

path.set('/queryBlogByPage', queryBlogByPage);


//博客详情页
function queryBlogById(request, response) {
    var params = url.parse(request.url, true).query;

    blogDAO.queryBlogById(parseInt(params.bid), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
        //浏览数+1
        blogDAO.addViews(parseInt(params.bid), function (result) {})
    })
}

path.set('/queryBlogById', queryBlogById);

//获取博客总数
function queryBlogCount(request, response) {
    blogDAO.queryBlogCount(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    })
}

path.set('/queryBlogCount', queryBlogCount);

//siteMape获取文章目录
function queryAllBlog(request, response) {
    blogDAO.queryAllBlog(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    })
}
path.set('/queryAllBlog', queryAllBlog);


//右边侧栏  通过浏览数排序
function queryHotBlog(request, response) {
    blogDAO.queryHotBlog(5, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    })
}
path.set('/queryHotBlog', queryHotBlog);

//获取总访问量
function queryAllViewsCount(request, response) {
    blogDAO.queryAllViewsCount(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    })
}
path.set('/queryAllViewsCount', queryAllViewsCount);


module.exports.path = path;