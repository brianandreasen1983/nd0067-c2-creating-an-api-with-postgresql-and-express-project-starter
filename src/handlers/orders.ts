import express, { request, Request, Response } from 'express'
import { Order, OrderStore} from '../models/order'
import jwt, {JsonWebTokenError} from 'jsonwebtoken'

const orderStore = new OrderStore()

const index = async(_req: Request, res: Response) => {
    try {
        const orders = await orderStore.index()
        res.status(200)
        res.json(orders)
    } catch (error) {
        throw new Error(`Unable to get the orders from the database: ${error}`)
    }
}

const show = async(req: Request, res: Response) => {
     try {
        const orderId: number = parseInt(req.params.id)
        const order = await orderStore.show(orderId)
        res.status(200)
        res.json(order)
     } catch (error) {
         throw new Error(`Unable to get the order requested: ${error}`)
     }
}

const addProduct = async(_req: Request, res: Response) => {
    const orderId: string = _req.params.id
    const productId: string = _req.body.productId
    const quantity: number = parseInt(_req.body.quantity)

    try {
        const addedProduct = await orderStore.addProduct(quantity, orderId,  productId)
        res.status(201)
        res.json(addedProduct)
    } catch (error) {
        res.status(400)
        res.json(console.error()
        )
    }
}

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

const verifyAuthToken = (req: Request, res: Response, next) => {
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        next()
    } catch (error) {
        res.status(401)
        res.status(401)
        throw new JsonWebTokenError(`Invalid token or token has expired.`)
    }
}

const orderRoutes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/orders/:id/products', addProduct)
    app.post('/orders/:userid', verifyAuthToken, currentOrderByUserId)
}

export default orderRoutes
