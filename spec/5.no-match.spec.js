const { expect } = require('chai')
const { get } = require('./requests')
const { extractBody } = require('../lib/body')

describe('No matching route', ()=>{

    it('is covered', (done)=>{
        get('/unknown')((response)=>{
            expect(response.statusCode).to.equal(404)
            expect(response.headers['content-type']).to.equal('text/plain')
            extractBody(response, (body)=>{
                expect(body).to.deep.equal('no matching route')
                done()
            })
        })
    })
})
