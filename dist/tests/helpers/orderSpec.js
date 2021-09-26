"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/order");
const orderStore = new order_1.OrderStore();
const userId = 47;
describe("Order Model", () => {
    it('should have a get current user order method', () => {
        expect(orderStore.currentOrderByUser).toBeDefined();
    });
    // TODO: Backend structure needs work still.
    // it('gets the current order by the user id', async () => {
    //     const result = await orderStore.currentOrderByUser(userId)
    //     expect(result).toEqual({
    //         id: 1,
    //         quantity: 10,
    //         order_id: 1,
    //         product_id: 1,
    //         user_id: 1,
    //         status: 'active'
    //     });
    // });
});
