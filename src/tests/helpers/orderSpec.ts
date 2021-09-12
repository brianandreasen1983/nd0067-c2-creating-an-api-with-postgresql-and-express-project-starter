import { Order, OrderStore} from '../../models/order'

const orderStore = new OrderStore()

describe("Order Model", () => {
    it('should have an index method', () => {
        expect(orderStore.index).toBeDefined()
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

it('create method should add a new product', async () => {
    const result = await orderStore.addProduct(10, 1, 1)
    expect(result).toEqual({
        id: 1,
        quantity: 10,
        order_id: 1,
        product_id: 1
    });
});

it('index method should return a list of order', async () => {
    const result = await orderStore.index();
    expect(result).toEqual([{
        id: 1,
        user_id: 1,
        status: '',
    }]);
});

it('show method should return a single order', async () => {
    const result = await orderStore.show(1);
    expect(result).toEqual({
        id: 1,
        user_id: 1,
        status: '',
    })
});

// it('gets the current order by the user id', async () => {
//     const result = await orderStore.currentOrderByUser()
//     expect(result).toEqual({
//         // TODO: Stub out the current order.
//     });
// });