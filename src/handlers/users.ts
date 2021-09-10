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
    const users = await userStore.index()
    res.json(users)
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

    const user = await userStore.show(req.body.id)
    res.json(user)
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
        console.log(`CREATED THE USER: ${newUser}`)
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

