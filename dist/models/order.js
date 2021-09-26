"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
// TODO: Troubleshoot this a bit more.
class OrderStore {
    async currentOrderByUser(userId) {
        try {
            const sql = `SELECT order_products.id, quantity, order_id, product_id, orders.user_id, orders.status 
                         FROM public.order_products RIGHT JOIN orders ON orders.id = order_products.order_id WHERE orders.user_id = ${userId};`;
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [userId]);
            const currentOrder = result.rows[0];
            console.log(currentOrder);
            conn.release();
            return currentOrder;
        }
        catch (error) {
            throw new Error(`Could not get orders for the userId of: ${userId}. Error: ${error}`);
        }
    }
}
exports.OrderStore = OrderStore;
