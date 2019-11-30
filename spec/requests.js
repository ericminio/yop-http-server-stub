const { get, request } = require('http')
const { port } = require('../lib')

const getRequest = (path, headers)=>{
    return (verify)=>{
        get({ path:path, port:port, headers:headers }, (response)=>{ verify(response) })
    }
}
const postRequest = (path, headers)=>{
    return (body, verify)=>{
        var action = { path:path, port:port, headers:headers, method:'POST' }
        var post = request(action, (response)=>{ verify(response) })
        post.write(body)
        post.end()
    }
}

module.exports = {
    get:getRequest,
    post:postRequest
}
