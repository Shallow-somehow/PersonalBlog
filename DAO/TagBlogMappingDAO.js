var dbutil = require('./DBUtil');


// 新增映射
function insertTagBlogMapping(tagId, blogId, ctime, success) {
    var insertSql = 'insert into tag_blog_mapping (`tag_id`, `blog_id`, `ctime`) values (?, ?, ?);';
    var params = [tagId, blogId, ctime];

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

//通过tag筛选文章
function queryByTag(tagId, page, pageSize, success) {
    var querySql = 'select * from tag_blog_mapping where tag_id = ? limit ?, ?;';
    var params = [tagId, page, pageSize];

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


//筛选过后文章的总数
function queryByTagCount(tagId, success) {
    var querySql = 'select count(1) as count from tag_blog_mapping where tag_id = ?;';
    var params = [tagId];

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




module.exports.insertTagBlogMapping = insertTagBlogMapping;
module.exports.queryByTag = queryByTag;
module.exports.queryByTagCount = queryByTagCount;
