const { expect } = require('chai')
const { get } = require('./requests')
const { extractBody } = require('../lib/body')

describe('Matching url', ()=>{

    it('is available', (done)=>{
        get('/can-you-see-me')((response)=>{
            expect(response.statusCode).to.equal(200)
            expect(response.headers['content-type']).to.equal('application/json')
            extractBody(response, (body)=>{
                expect(body).to.deep.equal(JSON.stringify({ message:'Yes I can!' }))
                done()
            })
        })
    })
})
