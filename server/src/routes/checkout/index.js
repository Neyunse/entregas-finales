import { Router } from 'express'

const Checkout = Router()
import { processPayment } from './controllers'
import { jwtGet } from '../../routes/products/services/jwt'

Checkout.post('/:cid', jwtGet, processPayment)

export default Checkout
