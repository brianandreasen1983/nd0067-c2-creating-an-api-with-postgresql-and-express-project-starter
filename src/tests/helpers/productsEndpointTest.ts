import supertest from 'supertest';
import app from '../../server';
import { Product } from '../../models/product';


const request = supertest(app)
const productId = 1;

describe('Products Endpoint Tests', () => {
    it('gets all of the products from the endpoint', async () => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
    });

    it('creates a single product', async () => {
        const product: Product = {
            name: 'Banana',
            price: 1.00
        };

        await request.post('/products').send(product).then((response) => {
            console.log(response.status);
            expect(response.status).toBe(401);
        }).catch((error) => {
            // TODO: Write an expect here for the error to be thrown.
        });
    });

    it('gets a single product from the endpoint', async () => {
        const response = await request.get(`/products/${productId}`);
        expect(response.status).toBe(200);
    })
})