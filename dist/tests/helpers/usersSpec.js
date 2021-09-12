"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const userStore = new user_1.UserStore();
// TODO: We should have a setup that allow us to increment the id instead of having to manually change it all the time.
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
    it('create method should return a single user that is new', async () => {
        const user = {
            firstname: "Brian",
            lastname: "Andreasen",
            password: "12345678"
        };
        const result = await userStore.create(user.firstname, user.lastname, user.password);
        expect(result).toEqual({
            id: 21,
            firstname: "Brian",
            lastname: "Andreasen",
        });
    });
    it('index method should return a list of users', async () => {
        const result = await userStore.index();
        expect(result).toEqual([{
                id: 21,
                firstname: "Brian",
                lastname: "Andreasen",
            }]);
    });
    it('show method should return a single user by user id', async () => {
        const userId = 21;
        const result = await userStore.show(userId);
        expect(result).toEqual({
            id: 21,
            firstname: "Brian",
            lastname: "Andreasen",
        });
    });
    afterEach(() => {
        // TODO: Runs after each test...
    });
});
