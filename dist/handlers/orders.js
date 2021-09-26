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
const currentOrderByUserId = async (req, res) => {
    const userId = parseInt(req.params.userid);
    try {
        const ordersByUserId = orderStore.currentOrderByUser(userId);
        res.status(200);
        res.json(ordersByUserId);
    }
    catch (error) {
        throw new Error(`Unable to get the order for the user id: ${userId}`);
    }
};
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const tokenSecret = process.env.TOKEN_SECRET;
        if (authorizationHeader !== undefined && tokenSecret !== undefined) {
            const token = authorizationHeader.split(' ')[1];
            jsonwebtoken_1.default.verify(token, tokenSecret);
            next();
        }
    }
    catch (error) {
        res.status(401);
        throw new jsonwebtoken_1.JsonWebTokenError(`Invalid token or token has expired.`);
    }
};
const orderRoutes = (app) => {
    app.post('/orders/:userid', verifyAuthToken, currentOrderByUserId);
};
exports.default = orderRoutes;
