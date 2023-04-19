import chai from 'chai'
import supertest from 'supertest'

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('App testing', () => {
    it('/api/auth/drop (POST)', async function () {
        await requester.post('/api/auth/drop')
    })
    it('/api/auth/register (POST)', async function () {
        const response = await requester
            .post('/api/auth/register')
            .field('username', 'Mock User')
            .field('email', 'mock@example.com')
            .field('password', '123')
            .attach('avatar', './src/testing/images.jpg')
        expect(response.status).to.be.equal(200)
    })
    it('/api/products (GET)', async function () {
        const response = await requester.get('/api/products')
        expect(response.status).to.be.equal(200)
    })
})
