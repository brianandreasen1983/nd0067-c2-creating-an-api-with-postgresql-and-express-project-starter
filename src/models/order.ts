import Client from '../database';

export type Order = {
    id: number
    product_id: number
    user_id: number
    quantity: number
    order_status: string
}

export class OrderStore {
    /** Retreives the current order by the user's Id */
    async currentOrderByUser(userId: number): Promise<Order> {
        console.log('CURRENT ORDER BY USER: ', userId)
        try {
            const sql = `SELECT id, product_id, user_id, quantity, order_status FROM orders WHERE user_id = ${userId};`
            const conn = await Client.connect()
            const result = await conn.query(sql, [userId])
            const currentOrder = result.rows[0]
            conn.release()
            return currentOrder
        } catch (error) {
            // TODO: We need to return an error back tot he client itself...
            throw new Error(`Could not get orders for the userId of: ${userId}.`)
        }
    }

    /** Retrieves all of the orders from the database. */
    async index(): Promise<Order[]> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT id, product_id, user_id, quantity, order_status FROM orders;'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Unable to get orders: ${error}`)
        }
    }

    // TODO: Test the insert statement to create a new order
    async create(): Promise<Order> {
        try { 
            const conn = await Client.connect()
            const sql = 'INSERT STATEMENT FOR AN ORDER GOES HERE'
            const result = await conn.query(sql)
            conn.release()
            const order = result.rows[0]
            return order
        } catch(error) {
            throw new Error('Unable to create a new order.')
        }
    }
    
}

