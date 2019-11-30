const { createServer, get, request } = require('http')
const { extractBody } = require('./body')
const { read } = require('./file±')
const port = 5005

const server = {
    start: function(done) {
        this.internal = createServer((request, response)=>{
            console.log('\n', request.method, request.url, request.headers)
            extractBody(request, (body)=>{
                console.log('body:', body)
                let config = read('config.json')
                let statusCode = config.default.statusCode
                let contentType = config.default.contentType
                let answer = JSON.stringify(config.default.answer)
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
                        if (candidate.status) {
                            statusCode = candidate.status
                        }
                        answer = candidate.answer
                        if (candidate.answer instanceof Object) {
                            answer = JSON.stringify(candidate.answer)
                        }
                        if (candidate.contentType) {
                            contentType = candidate.contentType
                        }

                        break
                    }
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
