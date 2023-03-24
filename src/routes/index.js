import { Router } from 'express'
const routes = Router()
import Product from './products'
import Cart from './cart'

routes.use('/api/products', Product)
routes.use('/api/cart', Cart)


export default routes
