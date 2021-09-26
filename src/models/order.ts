import Client from '../database';

export type Order = {
    id: number
    quantity: number
    order_id: number
    product_id: number
    user_id: number
    status: string
}

// TODO: Troubleshoot this a bit more.
export class OrderStore {
    async currentOrderByUser(userId: number): Promise<Order> {
        try {
            const sql = `SELECT order_products.id, quantity, order_id, product_id, orders.user_id, orders.status 
                         FROM public.order_products RIGHT JOIN orders ON orders.id = order_products.order_id WHERE orders.user_id = ${userId};`
            const conn = await Client.connect()
            const result = await conn.query(sql, [userId])
            const currentOrder = result.rows[0]
            console.log(currentOrder)
            conn.release()
            return currentOrder
        } catch (error) {
            throw new Error(`Could not get orders for the userId of: ${userId}. Error: ${error}`)
        }
    }
}

