"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Unable to get orders: ${error}`);
        }
    }
    async show(orderId) {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT * FROM orders where id=${orderId}`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Unable to find a order with the id: ${orderId}. ${error}`);
        }
    }
    async addProduct(quantity, orderId, productId) {
        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [quantity, orderId, productId]);
            const orderProduct = result.rows[0];
            conn.release();
            return orderProduct;
        }
        catch (error) {
            throw new Error(`Could not add product ${productId} to order. ${error}`);
        }
    }
    async currentOrderByUser(userId) {
        try {
            const sql = `SELECT order_products.id, quantity, order_id, product_id, orders.user_id, orders.status 
                         FROM public.order_products RIGHT JOIN orders ON orders.id = order_products.order_id WHERE orders.user_id = ${userId};`;
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [userId]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (error) {
            throw new Error(`Could not get orders for the userId of: ${userId}. Error: ${error}`);
        }
    }
}
exports.OrderStore = OrderStore;
