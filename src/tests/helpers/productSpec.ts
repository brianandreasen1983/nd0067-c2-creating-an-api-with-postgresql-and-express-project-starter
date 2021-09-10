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

it('index method should return a list of products', async () => {
    const result = await productStore.index();
    expect(result).toEqual([{
        id: 3,
        name: "Banana",
        price: 1
    }])
});

it('show method should return a single product', async () => {
    const result = await productStore.show(3)
    expect(result).toEqual({
        id: 3,
        name: "Banana",
        price: 1
    })
});

it('create method should create a single product', async () => {
    // TODO: We need to test if the token is valid or not.

    const product: Product = {
        id: 4,
        name: "Peach",
        price: 4
    }

    const result = await productStore.create(product)
    expect(result).toEqual({
        id: 4,
        name: "Peach",
        price: 4
    })
});
