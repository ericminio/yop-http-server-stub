const { expect } = require('chai')
const { get } = require('./requests')
const { extractBody } = require('../lib/body')

describe('server', ()=>{

    it('is alive', (done)=>{
        get('/ping')((response)=>{
            expect(response.statusCode).to.equal(200);
            done()
        })
    })

    it('returns json', (done)=>{
        get('/ping')((response)=>{
            expect(response.headers['content-type']).to.equal('application/json');
            done()
        })
    })

    it('returns expected data', (done)=>{
        get('/ping')((response)=>{
            extractBody(response, (body)=>{
                expect(body).to.deep.equal(JSON.stringify({ alive:true }))
                done()
            })
        })
    })

    it('is default answer', (done)=>{
        get('/anything')((response)=>{
            extractBody(response, (body)=>{
                expect(body).to.deep.equal(JSON.stringify({ alive:true }))
                done()
            })
        })
    })
})
