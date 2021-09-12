import Client from '../database'

export type Product = {
    id?: number
    name: string
    price: number
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect()
            const sql = "SELECT * FROM products;"
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Unable to get products. Error: ${error}`)
        }
    }

    async show(productId: number): Promise<Product> {
        try {
            const conn = await Client.connect()
            const sql = `SELECT * FROM products WHERE id=(${productId});`
            const result = await conn.query(sql)

            const product = result.rows[0]

            const returnedProduct = {
                id: product.id,
                name: product.name,
                price: product.price
            }
            conn.release()
            return returnedProduct
        } catch (error) {
            throw new Error(`Unable to find a product with id: ${productId}`)
        }
    }

    async create(p: Product): Promise<Product> {
        try {
            const conn = await Client.connect()
            const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *'
            const result = await conn.query(sql, [p.name, p.price])
            conn.release()
            const product = result.rows[0]
            return product
        } catch (error) {
            throw new Error(`Unable to create product: ${p.name}. ${error}`)
        }
    }
}