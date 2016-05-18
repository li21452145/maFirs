var fs = require("fs");
function init1(res) {
    console.log(res);
    var data = fs.readFileSync("./json/carousel.txt", "utf8");
    res.writeHead(200, {'content-type': 'text/txt; charset=UTF-8'});
    res.end(data);
}

module.exports = {
    init1: init1
};