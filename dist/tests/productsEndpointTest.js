"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../src/server"));
const request = (0, supertest_1.default)(server_1.default);
describe('Products Endpoint Responses', () => {
    it('gets all of the products from the endpoint', async (done) => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
    });
    // TODO: Need to pass in an id...
    it('gets a single product from the endpoint', async (done) => {
        const response = await request.get('/products/1');
        expect(response.status).toBe(201);
    });
    // TODO: Need to pass in a product to be created.
    // it('creates a single product', async (done) => {
    //     const response = await request.post('products')
    //     expect(response.status).toBe(201)
    // });
});
