import supertest from 'supertest';
import app from '../../src/server';

const request = supertest(app)

describe('Products Endpoint Responses', () => {
    it('gets all of the products from the endpoint', async (done) => {
        const response = await request.get('/products')
        expect(response.status).toBe(200)
    });

    // TODO: Need to pass in an id...
    it('gets a single product from the endpoint', async (done) => {
        const response = await request.get('/products/1')
        expect(response.status).toBe(201)
    })

    // TODO: Need to pass in a product to be created.
    // it('creates a single product', async (done) => {
    //     const response = await request.post('products')
    //     expect(response.status).toBe(201)
    // });
})