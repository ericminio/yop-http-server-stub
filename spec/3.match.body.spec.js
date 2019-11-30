const { expect } = require('chai')
const { post } = require('./requests')
const { extractBody } = require('../lib/body')

describe('Matching body', ()=>{

    it('is available', (done)=>{
        post('/create-something')(JSON.stringify({ name:'ok' }), (response)=>{
            expect(response.statusCode).to.equal(200)
            expect(response.headers['content-type']).to.equal('application/json')
            extractBody(response, (body)=>{
                expect(body).to.deep.equal(JSON.stringify({ message:'all good' }))

                post('/create-something')(JSON.stringify({ name:'ko' }), (response)=>{
                    expect(response.statusCode).to.equal(200)
                    expect(response.headers['content-type']).to.equal('application/json')
                    extractBody(response, (body)=>{
                        expect(body).to.deep.equal(JSON.stringify({ message:'sorry' }))
                        done()
                    })
                })
            })
        })
    })
})
