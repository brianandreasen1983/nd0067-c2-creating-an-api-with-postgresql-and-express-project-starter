import { Order, OrderStore} from '../../models/order'

const orderStore = new OrderStore();

describe("Order Model", () => {
    it('should have a get current user order method', () => {
        expect(orderStore.currentOrderByUser).toBeDefined();
    });

    it('should have a index method to get a list of orders', () => {
        expect(orderStore.index).toBeDefined();
    });

    it('should have a create method to create an order', () => {
        expect(orderStore.create).toBeDefined();
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

