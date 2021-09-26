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
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const userStore = new user_1.UserStore();
const index = async (req, res) => {
    try {
        const users = await userStore.index();
        res.status(200);
        res.json(users);
    }
    catch (error) {
        throw new Error(`Unable to get the list of users: ${error}`);
    }
};
const show = async (req, res) => {
    try {
        const user = await userStore.show(req.body.id);
        res.status(200);
        res.json(user);
    }
    catch (error) {
        throw new Error(`Unable to get the requested user: ${error}`);
    }
};
const create = async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    try {
        const newUser = await userStore.create(firstName, lastName, password);
        const tokenSecret = process.env.TOKEN_SECRET;
        if (tokenSecret != undefined) {
            const token = jsonwebtoken_1.default.sign({ user: newUser }, tokenSecret);
            res.status(201);
            res.json(token);
        }
    }
    catch (error) {
        res.status(400);
        res.json(error);
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
const userRoutes = (app) => {
    app.get('/users', verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken, show);
    app.post('/users', create);
};
exports.default = userRoutes;
