"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
describe('Users Endpoint Responses', () => {
    // it('retreives a list of users.', async () => {
    //     // TODO: Write the test to retrieve the list of users.
    // });
    // it('fails to retrieve a list of users if no token is provided', async () => {
    //     // TODO: Write the test to have it fail if no token is provided.
    // });
    // it('gets a user by user id', async () => {
    //     // TODO: Write the test to get the user by a given id.
    // });
    // it('fails to get a user by a invalid id', async () => {
    //     // TODO: Write the test to fail if a user id is invalid.
    // });
    // it('fails to get the user by id if no token is present', async () => {
    //     // TODO: Write the test to fail if no token is present.
    // });
    // it('creates a new user', async () => {
    //     // TODO: Write the test to create a new user.
    // });
});
