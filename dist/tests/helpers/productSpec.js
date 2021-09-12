"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../models/product");
const productStore = new product_1.ProductStore();
// TODO: We should have a setup that allow us to increment the id instead of having to manually change it all the time.
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
});
it('create method should create a single product', async () => {
    const product = {
        name: "Banana",
        price: 1
    };
    const result = await productStore.create(product);
    expect(result).toEqual({
        id: 21,
        name: "Banana",
        price: 1
    });
});
it('index method should return a list of products', async () => {
    const result = await productStore.index();
    expect(result).toEqual([{
            id: 21,
            name: "Banana",
            price: 1
        }]);
});
it('show method should return a single product', async () => {
    const productId = 21;
    const result = await productStore.show(productId);
    expect(result).toEqual({
        id: 21,
        name: "Banana",
        price: 1
    });
});
