const { expect } = require('chai')
const { get } = require('./requests')
const { extractBody } = require('../lib/body')

describe('Errors stubs', ()=>{

    it('is available', (done)=>{
        get('/not-found')((response)=>{
            expect(response.statusCode).to.equal(404)
            expect(response.headers['content-type']).to.equal('text/plain')
            extractBody(response, (body)=>{
                expect(body).to.deep.equal('NOT FOUND')
                done()
            })
        })
    })
})
