import Client from '../database';

export type Order = {
    id: number
    user_id: number
    status: string
}

export class OrderStore {
    async index(): Promise<Array<Order>> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM orders'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Unable to get orders: ${error}`)
        }
    }

    async show(orderId: number): Promise<Order> {
        try {
            const conn = await Client.connect()
            console.log(orderId)
            const sql = `SELECT * FROM orders where id=${orderId}`
            const result = await conn.query(sql)
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Unable to find a order with the id: ${orderId}. ${error}`)
        }
    }

    async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
        try {
          const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
          const conn = await Client.connect()
          const result = await conn.query(sql, [quantity, orderId, productId])
            
          const order = result.rows[0]
    
          conn.release()
    
          return order
        } catch (err) {
          throw new Error(`Could not add product ${productId} to order. ${err}`)
        }
    }

    // TODO: - Current Order by user (args: user id)[token required]
    async currentOrderByUser(userId: number): Promise<Order> {
        try {
            const sql = `SELECT * FROM orders WHERE userId=($1)`
            const conn = await Client.connect()
            const result = await conn.query(sql, [userId])
            const order = result.rows[0]
            conn.release()
            return order
        } catch (error) {
            throw new Error(`Could not get orders for the userId of: ${userId}. Error: ${error}`)
        }
    }

}

