import express, { Request, Response} from 'express'
import { User, UserStore } from '../models/user'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'

const userStore = new UserStore()


const index = async(req: Request, res: Response) => {
    try {
       const authorizationHeader = req.headers.authorization
       const token = authorizationHeader.split(' ')[1]
       jwt.verify(token, process.env.TOKEN_SECRET)
    } catch (error) {
        res.status(401)
        throw new JsonWebTokenError(`Token is invalid or no token provided...${error}`)
    }

    // Only queries if the jwt is verified otherwise it errors.
    try {
        const users = await userStore.index()
        res.status(200)
        res.json(users)
    } catch (error) {
        throw new Error(`Unable to get the list of users: ${error}`)
    }

}

const show = async(req: Request, res: Response) => {
    try {
       const authorizationHeader = req.headers.authorization
       const token = authorizationHeader.split(' ')[1]
       jwt.verify(token, process.env.TOKEN_SECRET)
    } catch (error) {
        res.status(401)
        throw new JsonWebTokenError(`Token is invalid or no token provided...${error}`)
    }

    try {
        const user = await userStore.show(req.body.id)
        res.status(200)
        res.json(user)
    } catch (error) {
        throw new Error(`Unable to get the requested user: ${error}`)
    }

}

const create = async(req: Request, res: Response) => {
    try {
       const authorizationHeader = req.headers.authorization
       const token = authorizationHeader.split(' ')[1]
       jwt.verify(token, process.env.TOKEN_SECRET)
    } catch (error) {
        res.status(401)
        throw new JsonWebTokenError(`Token is invalid or no token provided...${error}`)
    }

    // Does not pass this point unless the JWT is verified.
    const user: User = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
    }

    try {
        const newUser = await userStore.create(user)
        const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.status(201)
        res.json(token)
    } catch (error) {
        res.status(400)
        res.json(error + user)
    }
}

const userRoutes = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/users', create)
}

export default userRoutes;

