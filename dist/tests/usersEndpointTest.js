"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../src/server"));
const request = (0, supertest_1.default)(server_1.default);
describe('Users Endpoint Responses', () => {
    // Write a test for each endpoint in the describe body.
    // TODO: Write an endpoint test for /users index (get)
    // TODO: Write an endpoint test for /users:id show (get)
    // TODO: write an endpoint test for /users create (post)
});
