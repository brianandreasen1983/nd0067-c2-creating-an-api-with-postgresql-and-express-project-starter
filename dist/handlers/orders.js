"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const orderStore = new order_1.OrderStore();
const index = async (req, res) => {
    const orders = await orderStore.index();
    res.json(orders);
};
const show = async (req, res) => {
    try {
        // const authorizationHeader = req.headers.authorization
        // const token = authorizationHeader.split(' ')[1]
        // jwt.verify(token, process.env.TOKEN_SECRET)
        const orderId = parseInt(req.params.id);
        const order = await orderStore.show(orderId);
        res.json(order);
    }
    catch (error) {
        // TODO: Fix the error handling if possible.
        console.log(error);
        res.status(401);
        //  throw new JsonWebTokenError(`Token is invalid or no token provided...${error}`)
    }
    const order = await orderStore.show(req.body.userid);
    res.json(order);
};
const addProduct = async (_req, res) => {
    const orderId = _req.params.id;
    const productId = _req.body.productId;
    const quantity = parseInt(_req.body.quantity);
    try {
        const addedProduct = await orderStore.addProduct(quantity, orderId, productId);
        res.json(addedProduct);
    }
    catch (error) {
        res.status(400);
        res.json(console.error());
    }
};
// TODO: Protect this route by verifying the JWT.
const currentOrderByUserId = async (req, res) => {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader.split(' ')[1];
    try {
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (error) {
        throw new jsonwebtoken_1.JsonWebTokenError(`There has been an error with the JWT: ${error}`);
    }
    const userId = parseInt(req.params.userid);
    try {
        const ordersByUserId = orderStore.currentOrderByUser(userId);
        res.json(ordersByUserId);
    }
    catch (error) {
        throw new Error(`Unable to get the order for the user id: ${userId}`);
    }
};
const orderRoutes = (app) => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders/:id/products', addProduct);
    app.post('/orders/:userid');
};
exports.default = orderRoutes;
