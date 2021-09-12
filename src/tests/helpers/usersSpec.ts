import { User, UserStore} from '../../models/user'

const userStore = new UserStore()

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

    // it('create method should return a single user that is new', async () => {
    //     const user: User = {
    //         firstname: "Brian",
    //         lastname: "Andreasen",
    //         password: "12345678"
    //     }
    
    //     const result = await userStore.create(user.firstname, user.lastname, user.password)
    //     expect(result).toEqual({
    //         id: 23,
    //         firstname: "Brian",
    //         lastname: "Andreasen",
    //     })
    // });
    
    it('index method should return a list of users', async () => {
        const result = await userStore.index()
        expect(result).toEqual([{
            id: 23,
            firstname: "Brian",
            lastname: "Andreasen",
        }]) 
    });
    
    it('show method should return a single user by user id', async () => {
        const userId = 23
        const result = await userStore.show(userId)
        expect(result).toEqual({
            id: 23,
            firstname: "Brian",
            lastname: "Andreasen",
        }) 
    });

    afterEach(() => {
        // TODO: Runs after each test...
    })
});