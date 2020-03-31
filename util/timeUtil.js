function getTime() {
    var date = new Date();
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}


module.exports.getTime = getTime;