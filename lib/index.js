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
                let statusCode = 404;
                let contentType = "text/plain";
                let answer = "no matching route";                
                let routes = config.routes
                for (var i=0; i<routes.length;i++) {
                    let candidate = routes[i]
                    let found = true                    
                    if (candidate.incoming.url && !new RegExp(candidate.incoming.url).test(request.url)) {
                        found = false
                    }
                    if (candidate.incoming.body && !new RegExp(candidate.incoming.body).test(body)) {
                        found = false
                    }
                    if (found) {
                        if (candidate.answer.statusCode) {
                            statusCode = candidate.answer.statusCode
                        }
                        if (candidate.answer.contentType) {
                            contentType = candidate.answer.contentType
                        }
                        answer = candidate.answer.body
                        break
                    }
                }
                if (answer instanceof Object) {
                    answer = JSON.stringify(answer)
                }
                console.log('-> answering with', statusCode, contentType, answer)
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
