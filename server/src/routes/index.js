import { Router } from 'express'
const routes = Router()
import Product from './products'
import Cart from './cart'
import Auth from './auth'

routes.use('/api/products', Product)
routes.use('/api/cart', Cart)
routes.use('/api/auth', Auth)

export default routes
