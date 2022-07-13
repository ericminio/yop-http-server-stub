var fs = require('fs')
var path = require('path')

const read = (file)=>{
    var data = fs.readFileSync(path.join(__dirname, file)).toString()
    return JSON.parse(data)
}

const configs = (dir)=> {
    let files = []
    fs.readdirSync(path.join(__dirname, dir)).forEach(file => {
        if (file.endsWith('.json')) {
            files.push(file);
        }
    });
    return files;
}

module.exports = {
    read,
    configs
}
