const { expect } = require('chai')
const { ApolloClient, gql, HttpLink, InMemoryCache } = require('@apollo/client/core');
const fetch = require('cross-fetch');

describe('Graphql', () => {

    it('works as expected', (done) => {
        const client = new ApolloClient({
            link: new HttpLink({
                uri: 'http://localhost:5005/',
                fetch,
            }),
            cache: new InMemoryCache(),
        });
        client.query({
            query: gql`{ greetings }`
        })
            .then(response => {
                expect(response.data).to.deep.equal({ greetings: 'hello world' })
                done();
            })
            .catch(error => done(error))
    })
})
