var dbutil = require('./DBUtil');


//把从web层接收到的 [每日一句] 写入数据库
function insertEveryDay(content, ctime, success) {
    var insertSql = 'insert into every_day (`content`, `ctime`) values (?, ?);';
    var params = [content, ctime];
    
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

function queryEveryDay(success) {
    // 倒序拿第一个 ↓
    var querySql = 'select * from every_day order by id desc limit 1;';
    
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


module.exports.insertEveryDay = insertEveryDay;
module.exports.queryEveryDay = queryEveryDay;
