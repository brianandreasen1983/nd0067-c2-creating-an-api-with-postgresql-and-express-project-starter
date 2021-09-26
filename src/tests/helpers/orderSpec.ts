import { Order, OrderStore} from '../../models/order'

const orderStore = new OrderStore();
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

