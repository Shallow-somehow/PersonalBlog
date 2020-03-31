var blogDAO = require('../DAO/BlogDAO');
var respUtil = require('../util/respUtil');
var timeUtil = require('../util/timeUtil');
var tagDAO = require('../DAO/TagDAO');
var commentDAO = require('../DAO/CommentDAO');
var captcha = require('svg-captcha')
var url = require('url');
var tagBlogMappingDAO = require('../DAO/TagBlogMappingDAO');

var path = new Map();


//获取标签
function queryRandomTags(request, response) {
    tagDAO.queryAllTag(function (result) {
        result.sort(function () {
            return Math.random() - 0.5;
        })
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    });
}

path.set('/queryRandomTags', queryRandomTags);

//通过tag筛选文章
function queryByTag(request, response) {
    var params = url.parse(request.url, true).query;
    tagDAO.queryTag(params.tag, function (result) {
        if (result == null || result.length == 0) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '查询成功', result));
            response.end();
        } else {
            tagBlogMappingDAO.queryByTag(result[0].id, parseInt(params.page), parseInt(params.pageSize), function (result) {
                var blogList = [];
                for (let i = 0; i < result.length; i++) {
                    blogDAO.queryBlogById(result[i].blog_id, function (result) {
                        blogList.push(result[0]);
                    })
                }
                getResult(blogList, result.length, response);
            });
        };

    });


}

path.set('/queryByTag', queryByTag);

//获取筛选后的总数
function queryByTagCount(request, response) {
    var params = url.parse(request.url, true).query;
    tagDAO.queryTag(params.tag, function (result) {
        tagBlogMappingDAO.queryByTagCount(result[0].blog_id, function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '查询成功', result));
            response.end();
        });
    })
}

path.set('/queryByTagCount', queryByTagCount);


//阻塞
function getResult(blogList, len, response) {
    if (blogList.length < len) {
        setTimeout(function () {
            getResult(blogList, len, response)
        }, 10)
    } else {
        for (let i = 0; i < blogList.length; i++) {
            blogList[i].content = blogList[i].content.replace(/<.*?>/g, '');
            blogList[i].content = blogList[i].content.substring(0, 300);

        }
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', blogList));
        response.end();
    }
}



module.exports.path = path;
