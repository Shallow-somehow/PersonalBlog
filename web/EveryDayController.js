var everyDayDAO = require('../DAO/EveryDayDAO');
var respUtil = require('../util/respUtil');
var timeUtil = require('../util/timeUtil');
var path = new Map();

//写入每日一句
function editEveryDay(request, response) {
    request.on('data', function (data) {
        everyDayDAO.insertEveryDay(data.toString(), timeUtil.getTime(), function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '添加成功', null));
            response.end();
        });
    })
}

path.set('/editEveryDay', editEveryDay);


//从DA层O获取每日一句
function queryEveryDay(request, response) {
    everyDayDAO.queryEveryDay(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    })
}

path.set('/queryEveryDay', queryEveryDay);

module.exports.path = path;