import { Router } from 'express'
const routes = Router()
import Product from './products'

routes.use('api/products', Product)

export default routes
