var dbutil = require('./DBUtil');

//添加新评论
function addComment(blogId, parent, parentName, usetName, email, comments, ctime, success) {
    var insertSql = 'insert into comments (`blog_id`, `parent`, `parent_name`, `user_name`, `email`,  `comments`,`ctime`) values (?, ?, ?, ?, ?, ?, ?);';
    var params = [blogId, parent, parentName, usetName, email, comments, ctime];
    
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end()
}

function queryCommentsByBlogId(blogId, success) {
    var querySql = 'select * from comments where blog_id = ?;';
    var params = [blogId];
    
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end()
}


//评论总数
function queryCommentCountByBlogId(blogId, success) {
    var querySql = 'select count(1) as count from comments where blog_id = ?;';
    var params = [blogId];
    
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end()
}


//查询评论
function queryNewComment(size, success) {
    var querySql = 'select * from comments order by id desc limit ?;';
    var params = [size];
    
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end()
}

module.exports.addComment = addComment;
module.exports.queryCommentCountByBlogId = queryCommentCountByBlogId;
module.exports.queryCommentsByBlogId = queryCommentsByBlogId;
module.exports.queryNewComment = queryNewComment;