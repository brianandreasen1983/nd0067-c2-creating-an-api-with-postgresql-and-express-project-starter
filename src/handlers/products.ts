import express, { Request, Response} from 'express'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { Product, ProductStore} from '../models/product'

const productStore = new ProductStore()

const index = async(_req: Request, res: Response) => {
    const products = await productStore.index()
    res.json(products)
}

const show = async(_req: Request, res: Response) => {
    const product = await productStore.show(_req.body.id)
    res.json(product)
}

const create = async(req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET)
    } catch (error) {
        throw new JsonWebTokenError(`Token is invalid or no token provided...${error}`)
    }
    const product: Product = {
        name: req.body.name,
        price: req.body.price
    }

    try {
        const newProduct = await productStore.create(product)
        res.json(newProduct)
    } catch (error) {
        throw new Error(`Unable to create the product: ${product.name}. Error: ${error}`)
    }
}

const productRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', create)
}

export default productRoutes