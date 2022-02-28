import express, { NextFunction, request, Request, Response } from 'express'
import { Order, OrderStore} from '../models/order'
import jwt, {JsonWebTokenError} from 'jsonwebtoken'

const orderStore = new OrderStore()

// The reason this throws an error is because there are no records to query so it will drop to the catch block in the orderStore.
const currentOrderByUserId = async(req: Request, res: Response) => {
    const userId: number = parseInt(req.params.userId)

    try {
        const ordersByUserId = orderStore.currentOrderByUser(userId)
        res.status(200)
        res.json(ordersByUserId)
    } catch (error) {
        throw new Error(`Unable to get the order for the user id: ${userId}`)
    }
}

const index = async(req: Request, res: Response) => {
    try {
        const orders = await orderStore.index()
        res.status(200)
        res.json(orders)
    } catch (error) {
        throw new Error('An error occurred getting the orders')
    }
}

const create = async(req: Request, res: Response) => {
    try {
        // TODO: Code to be able to create an order as needed.
    } catch (error) {
        throw new Error('An error occurred while trying to create a new order.')
    }
}

// TODO: Make the schema change to include the product id and the quantity
// TODO: Troubleshoot db-migrate in order to make the schema changes.
// - id of each product in the order (product_id)
// - quantity of each product in the order (quantity)

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
    // TODO: Needs to have the verify auth token in the route.
    app.get('/orders/:userId', currentOrderByUserId)
    app.get('/orders', index)
    app.post('/orders', create)
}

export default orderRoutes
