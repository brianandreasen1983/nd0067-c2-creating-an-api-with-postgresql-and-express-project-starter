import express, { NextFunction, Request, Response} from 'express'
import { User, UserStore } from '../models/user'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'

const userStore = new UserStore()


const index = async(req: Request, res: Response) => {
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
        const user = await userStore.show(req.body.id)
        res.status(200)
        res.json(user)
    } catch (error) {
        throw new Error(`Unable to get the requested user: ${error}`)
    }

}

const create = async(req: Request, res: Response) => {
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const password = req.body.password

    try {
        const newUser = await userStore.create(firstName, lastName, password)
        const tokenSecret = process.env.TOKEN_SECRET;
        if(tokenSecret != undefined) {
            const token = jwt.sign({ user: newUser }, tokenSecret);
            res.status(201)
            res.json(token)
        }
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization
        const tokenSecret = process.env.TOKEN_SECRET;

        if(authorizationHeader !== undefined && tokenSecret !== undefined) {
            const token = authorizationHeader.split(' ')[1]
            jwt.verify(token, tokenSecret);
            next()
        }
    } catch (error) {
        res.status(401)
        throw new JsonWebTokenError(`Invalid token or token has expired.`)
    }
}

const userRoutes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index)
    app.get('/users/:id', verifyAuthToken, show)
    app.post('/users', create)
}

export default userRoutes;

