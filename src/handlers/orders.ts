import express, { NextFunction, request, Request, Response } from 'express'
import { Order, OrderStore} from '../models/order'
import jwt, {JsonWebTokenError} from 'jsonwebtoken'

const orderStore = new OrderStore()

const currentOrderByUserId = async(req: Request, res: Response) => {
    const userId: number = parseInt(req.params.userid)

    try {
        const ordersByUserId = orderStore.currentOrderByUser(userId)
        res.status(200)
        res.json(ordersByUserId)
    } catch (error) {
        throw new Error(`Unable to get the order for the user id: ${userId}`)
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

const orderRoutes = (app: express.Application) => {
    app.post('/orders/:userid', verifyAuthToken, currentOrderByUserId)
}

export default orderRoutes
