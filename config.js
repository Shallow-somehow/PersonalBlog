// 读取配置文件

var fs = require('fs');


var globalConfig = {};
var conf = fs.readFileSync('./server.conf');
var configArr = conf.toString().split('\r\n')
for (let i = 0; i < configArr.length; i++) {
    globalConfig[configArr[i].split('=')[0]] = configArr[i].split('=')[1].trim();
}

module.exports = globalConfig;