import { Router } from 'express'
const routes = Router()
import Product from './products'
import Cart from './cart'
import Auth from './auth'
import Checkout from './checkout'
routes.use('/api/products', Product)
routes.use('/api/cart', Cart)
routes.use('/api/auth', Auth)
routes.use('/api/checkout', Checkout)


export default routes
