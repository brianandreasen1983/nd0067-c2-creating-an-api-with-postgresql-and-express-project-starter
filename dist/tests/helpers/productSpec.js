"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../models/product");
const productStore = new product_1.ProductStore();
// Iterate productId on every run.
const productId = 48;
describe("Product Model", () => {
    it('should have an index method', () => {
        expect(productStore.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(productStore.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(productStore.create).toBeDefined();
    });
    it('create method should create a single product', async () => {
        const product = {
            name: "Banana",
            price: 1
        };
        const result = await productStore.create(product);
        expect(result).toEqual({
            id: productId,
            name: "Banana",
            price: 1
        });
    });
    it('show method should return a single product', async () => {
        const result = await productStore.show(productId);
        expect(result).toEqual({
            id: productId,
            name: "Banana",
            price: 1
        });
    });
    // Truncate table every time in postgres otherwise a new object wil need to be added every time in the array.
    it('index method should return a list of products', async () => {
        const result = await productStore.index();
        expect(result).toEqual([{
                id: productId,
                name: "Banana",
                price: 1
            },]);
    });
});
