"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/order");
const orderStore = new order_1.OrderStore();
describe("Order Model", () => {
    it('should have an index method', () => {
        expect(orderStore.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(orderStore.show).toBeDefined();
    });
    it('should have a add product method', () => {
        expect(orderStore.addProduct).toBeDefined();
    });
    it('should have a get current user order method', () => {
        expect(orderStore.currentOrderByUser).toBeDefined();
    });
});
// TODO: Broken may not even be needed?
// it('create method should add a new product', async () => {
//     const result = await orderStore.addProduct(10, 1, 1)
//     expect(result).toEqual({
//         id: 1,
//         quantity: 10,
//         order_id: 1,
//         product_id: 1
//     });
// });
it('index method should return a list of order', async () => {
    const result = await orderStore.index();
    expect(result).toEqual([{
            id: 2,
            user_id: 23,
            status: 'active',
        }]);
});
it('show method should return a single order', async () => {
    const orderId = 2;
    const result = await orderStore.show(orderId);
    expect(result).toEqual({
        id: 2,
        user_id: 23,
        status: 'active',
    });
});
// TODO: Needs to be worked on.
// it('gets the current order by the user id', async () => {
//     const result = await orderStore.currentOrderByUser()
//     expect(result).toEqual({
//         // TODO: Stub out the current order.
//     });
// });
