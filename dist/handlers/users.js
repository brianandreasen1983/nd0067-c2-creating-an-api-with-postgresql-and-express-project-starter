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
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (error) {
        res.status(401);
        throw new jsonwebtoken_1.JsonWebTokenError(`Token is invalid or no token provided...${error}`);
    }
    // Only queries if the jwt is verified otherwise it errors.
    const users = await userStore.index();
    res.json(users);
};
const show = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (error) {
        res.status(401);
        throw new jsonwebtoken_1.JsonWebTokenError(`Token is invalid or no token provided...${error}`);
    }
    const user = await userStore.show(req.body.id);
    res.json(user);
};
const create = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (error) {
        res.status(401);
        throw new jsonwebtoken_1.JsonWebTokenError(`Token is invalid or no token provided...${error}`);
    }
    // Does not pass this point unless the JWT is verified.
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
    };
    try {
        const newUser = await userStore.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        console.log(`CREATED THE USER: ${newUser}`);
        res.json(token);
    }
    catch (error) {
        res.status(400);
        res.json(error + user);
    }
};
const userRoutes = (app) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
};
exports.default = userRoutes;
