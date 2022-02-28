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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var order_1 = require("../models/order");
var jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
var orderStore = new order_1.OrderStore();
// The reason this throws an error is because there are no records to query so it will drop to the catch block in the orderStore.
var currentOrderByUserId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, ordersByUserId;
    return __generator(this, function (_a) {
        userId = parseInt(req.params.userId);
        try {
            ordersByUserId = orderStore.currentOrderByUser(userId);
            res.status(200);
            res.json(ordersByUserId);
        }
        catch (error) {
            throw new Error("Unable to get the order for the user id: " + userId);
        }
        return [2 /*return*/];
    });
}); };
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, orderStore.index()];
            case 1:
                orders = _a.sent();
                res.status(200);
                res.json(orders);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                throw new Error('An error occurred getting the orders');
            case 3: return [2 /*return*/];
        }
    });
}); };
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            // TODO: Code to be able to create an order as needed.
        }
        catch (error) {
            throw new Error('An error occurred while trying to create a new order.');
        }
        return [2 /*return*/];
    });
}); };
// TODO: Make the schema change to include the product id and the quantity
// TODO: Troubleshoot db-migrate in order to make the schema changes.
// - id of each product in the order (product_id)
// - quantity of each product in the order (quantity)
var verifyAuthToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        var tokenSecret = process.env.TOKEN_SECRET;
        if (authorizationHeader !== undefined && tokenSecret !== undefined) {
            var token = authorizationHeader.split(' ')[1];
            jsonwebtoken_1["default"].verify(token, tokenSecret);
            next();
        }
    }
    catch (error) {
        res.status(401);
        throw new jsonwebtoken_1.JsonWebTokenError("Invalid token or token has expired.");
    }
};
var orderRoutes = function (app) {
    // TODO: Needs to have the verify auth token in the route.
    app.get('/orders/:userId', currentOrderByUserId);
    app.get('/orders', index);
    app.post('/orders', create);
};
exports["default"] = orderRoutes;
