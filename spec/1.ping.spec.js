const { expect } = require('chai')
const { get } = require('./requests')
const { extractBody } = require('../lib/body')

describe('PING', ()=>{

    let url = '/ping/please';

    it('is available', (done)=>{
        get(url)((response)=>{
            expect(response.statusCode).to.equal(200);
            done()
        })
    });

    it('returns json', (done)=>{
        get(url)((response)=>{
            expect(response.headers['content-type']).to.equal('application/json');
            done()
        })
    });

    it('returns expected data', (done)=>{
        get(url)((response)=>{
            extractBody(response, (body)=>{
                expect(body).to.deep.equal(JSON.stringify({ alive:true }))
                done()
            })
        })
    });
})
