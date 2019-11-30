const { createServer, get, request } = require('http')
const { extractBody } = require('./body')
const port = 5005
const read = (file)=>{
    var fs = require('fs')
    var path = require('path')
    var data = fs.readFileSync(path.join(__dirname, file)).toString()

    return JSON.parse(data)
}
const server = {
    start: function(done) {
        this.internal = createServer((request, response)=>{
            console.log('\n', request.method, request.url, request.headers)
            response.setHeader('content-type', 'application/json')
            let answer = JSON.stringify({ alive:true })
            extractBody(request, (body)=>{
                console.log('body:', body)
                console.log('answering with', answer);
                response.write(answer)
                response.end()
            })
        })
        this.internal.listen(port, done);
    }
}

module.exports = {
    port:port
}

server.start(()=>{
    console.log('listening on port', port)
})
