"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
const productId = 47;
describe('Products Endpoint Tests', () => {
    it('gets all of the products from the endpoint', async () => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
    });
    // it('creates a single product', async () => {
    //     const product: Product = {
    //         name: 'Banana',
    //         price: 1
    //     };
    //     await request.post('/products').send(product).then((response) => {
    //         console.log(response.status);
    //         expect(response.status).toBe(401);
    //     }).catch((error) => {
    //         // TODO: Write an expect here for the error to be thrown.
    //     });
    // });
    it('gets a single product from the endpoint', async () => {
        const response = await request.get(`/products/${productId}`);
        expect(response.status).toBe(200);
    });
});
