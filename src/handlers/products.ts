import express, { NextFunction, Request, Response} from 'express'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { Product, ProductStore} from '../models/product'

const productStore = new ProductStore()

const index = async(_req: Request, res: Response) => {
    try {
        const products = await productStore.index()
        res.status(200)
        res.json(products)
    } catch (error) {
        throw new Error(`Unable to get productsss.`)
    }
}

const show = async(req: Request, res: Response) => {
    const productId = parseInt(req.params.id as string);
    try {
        const product =  await productStore.show(productId);
        res.status(200)
        res.json(product)
    } catch (error) {
        throw new Error(`Unable to get the requested product ${productId} does not exist.`)
    }
}

const create = async(req: Request, res: Response) => {
    const product: Product = {
        name: req.body.name,
        price: req.body.price
    }

    try {
        const newProduct = await productStore.create(product)
        res.status(201)
        res.json(newProduct)
    } catch (error) {
        throw new Error(`Unable to create the product: ${product.name}`)
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

const productRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', verifyAuthToken, create)
}

export default productRoutes