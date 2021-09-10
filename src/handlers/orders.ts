import express, { Request, Response } from 'express'
import { Order, OrderStore} from '../models/order'
import jwt, {JsonWebTokenError} from 'jsonwebtoken'

const orderStore = new OrderStore()

const index = async(req: Request, res: Response) => {
    const orders = await orderStore.index()
    res.json(orders)
}


const show = async(req: Request, res: Response) => {
    try {
        // const authorizationHeader = req.headers.authorization
        // const token = authorizationHeader.split(' ')[1]
        // jwt.verify(token, process.env.TOKEN_SECRET)

        const orderId: number = parseInt(req.params.id)
        const order = await orderStore.show(orderId)
        res.json(order)
     } catch (error) {
         // TODO: Fix the error handling if possible.
         console.log(error)
         res.status(401)
        //  throw new JsonWebTokenError(`Token is invalid or no token provided...${error}`)
     }

     const order = await orderStore.show(req.body.userid)
     res.json(order)
}

const addProduct = async(_req: Request, res: Response) => {
    const orderId: string = _req.params.id
    const productId: string = _req.body.productId
    const quantity: number = parseInt(_req.body.quantity)

    try {
        const addedProduct = await orderStore.addProduct(quantity, orderId,  productId)
        res.json(addedProduct)
    } catch (error) {
        res.status(400)
        res.json(console.error()
        )
    }
}

const currentOrderByUserId = async(req: Request, res: Response) => {
    const authorizationHeader = req.headers.authorization
    const token = authorizationHeader.split(' ')[1]
    try {
        jwt.verify(token, process.env.TOKEN_SECRET)
    } catch (error) {
        throw new JsonWebTokenError(`There has been an error with the JWT: ${error}`)
    }

    const userId: number = parseInt(req.params.userid)

    try {
        const ordersByUserId = orderStore.currentOrderByUser(userId)
        res.json(ordersByUserId)
    } catch (error) {
        throw new Error(`Unable to get the order for the user id: ${userId}`)
    }
}

const orderRoutes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/orders/:id/products', addProduct)
    app.post('/orders/:userid')
}

export default orderRoutes
