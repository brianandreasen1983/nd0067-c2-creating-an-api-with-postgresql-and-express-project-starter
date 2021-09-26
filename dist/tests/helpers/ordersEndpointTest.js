"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const userId = 41;
const request = (0, supertest_1.default)(server_1.default);
// describe('Orders Endpoint Responses', () => {
//     // TODO: Write a test to get the users current order by their user id
//     it('gets the users current order based on their user id.', async () => {
//         // TODO: Write the body of the test.
//     })
// })
