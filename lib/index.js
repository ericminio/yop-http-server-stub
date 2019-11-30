const { createServer, get, request } = require('http')
const { extractBody } = require('./body')
const { read } = require('./file')
const port = 5005

const server = {
    start: function(done) {
        this.internal = createServer((request, response)=>{
            extractBody(request, (body)=>{
                console.log('')
                console.log(request.method, request.url, request.headers)
                console.log('body:', body)
                let config = read('config.json')
                let { statusCode, contentType, answer } = config.default
                let routes = config.routes
                for (var i=0; i<routes.length;i++) {
                    let candidate = routes[i]
                    let found = true
                    if (candidate.url && !new RegExp(candidate.url).test(request.url)) {
                        found = false
                    }
                    if (candidate.body && !new RegExp(candidate.body).test(body)) {
                        found = false
                    }
                    if (found) {
                        if (candidate.statusCode) {
                            statusCode = candidate.statusCode
                        }
                        if (candidate.contentType) {
                            contentType = candidate.contentType
                        }
                        answer = candidate.answer
                        break
                    }
                }
                if (answer instanceof Object) {
                    answer = JSON.stringify(answer)
                }
                console.log('answering with', statusCode, contentType, answer)
                response.statusCode = statusCode
                response.setHeader('content-type', contentType)
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
