var dbutil = require('./DBUtil');

// 写入博客文章
function insertBlog(title, content, tags, views, ctime, success) {
    var insertSql = 'insert into blog (`title`, `content`, `tags`, `views`, `ctime`) values (?, ?, ?, ?, ?);';
    var params = [title, content, tags, views, ctime];
    
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

//页面展示文章查询
function queryBlogByPage(page, pageSize, success) {
    var querytSql = 'select * from blog order by id desc limit ?, ?;';
    var params = [page * pageSize, pageSize];
    
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querytSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end()
}


//文章详情页- 通过博客id获取数据
function queryBlogById(id, success) {
    var querytSql = 'select * from blog where id = ?;';
    var params = [id];
    
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querytSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end()
}

//首页获取文章总数
function queryBlogCount(success) {
    var querytSql = 'select count(1) as count from blog;';

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querytSql, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end()
}

//siteMap获取文章目录
function queryAllBlog(success) {
    var querytSql = 'select * from blog order by id desc;';

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querytSql, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end()
}

//增加浏览数
function addViews(blogId, success) {
    var querytSql = 'update blog set views = views + 1 where id = ?;';
    var params = [blogId]
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querytSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end()
}

//右边侧栏  通过浏览数排序
function queryHotBlog(size, success) {
    var querytSql = 'select * from blog order by views desc limit ?;';
    var params = [size]

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querytSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end()
}

//总访问量
function queryAllViewsCount(success) {
    var querytSql = 'select SUM(views) as sum from blog;';

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querytSql, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end()
}

module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogById = queryBlogById;
module.exports.queryBlogCount = queryBlogCount;
module.exports.addViews = addViews;
module.exports.queryHotBlog = queryHotBlog;
module.exports.queryAllViewsCount = queryAllViewsCount;
module.exports.queryAllBlog = queryAllBlog;


