"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const userStore = new user_1.UserStore();
describe("User Model", () => {
    it('should have an index method', () => {
        expect(userStore.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(userStore.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(userStore.create).toBeDefined();
    });
    it('', () => {
        expect(userStore.authenticate).toBeDefined();
    });
});
it('index method should return a list of users', async () => {
    const result = await userStore.index();
    expect(result).toEqual([{
            id: 1,
            firstName: "Brian",
            lastName: "Andreasen",
        }]);
});
// TODO: Write a test to return a single user by a given user id from the show method.
it('show method should return a list of users', async () => {
    const userId = 1;
    const result = await userStore.show(userId);
    expect(result).toEqual({
        id: 1,
        firstName: "Brian",
        lastName: "Andreasen",
    });
});
// TODO: How can we test that the password is hashed?
it('create method should return a single user that is new', async () => {
    const user = {
        firstName: "Cora",
        lastName: "Andreasen",
    };
    const result = await userStore.create(user);
    expect(result).toEqual({
        id: 2,
        firstName: "Cora",
        lastName: "Andreasen",
    });
});
