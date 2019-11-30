const read = (file)=>{
    var fs = require('fs')
    var path = require('path')
    var data = fs.readFileSync(path.join(__dirname, file)).toString()
    return JSON.parse(data)
}

module.exports = {
    read:read
}
