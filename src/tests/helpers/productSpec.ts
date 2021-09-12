import productRoutes from '../../handlers/products';
import {Product, ProductStore} from '../../models/product'

const productStore = new ProductStore()

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

// it('create method should create a single product', async () => {
//     const product: Product = {
//         name: "Banana",
//         price: 1
//     }

//     const result = await productStore.create(product)
//     expect(result).toEqual({
//         id: 23,
//         name: "Banana",
//         price: 1
//     })
// });

it('index method should return a list of products', async () => {
    const result = await productStore.index();
    expect(result).toEqual([{
        id: 23,
        name: "Banana",
        price: 1
    }])
});

it('show method should return a single product', async () => {
    const productId = 23
    const result = await productStore.show(productId)
    expect(result).toEqual({
        id: 23,
        name: "Banana",
        price: 1
    })
});