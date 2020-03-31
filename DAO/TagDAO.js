var dbutil = require('./DBUtil');


// 插入标签
function insertTag(tag, ctime, success) {
    var insertSql = 'insert into tags (`tag`, `ctime`) values (?, ?);';
    var params = [tag, ctime];
    
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



// 查询一个标签
function queryTag(tag, success) {
    var querySql = 'select * from tags where tag = ?;';
    var params = [tag]

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

//查询所有标签
function queryAllTag(success) {
    var querySql = 'select * from tags;';

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end()
}



module.exports.insertTag = insertTag;
module.exports.queryTag = queryTag;
module.exports.queryAllTag = queryAllTag;