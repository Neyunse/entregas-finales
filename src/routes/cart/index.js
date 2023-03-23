import { Router } from 'express'

import {
    postCart,
    deleteCart,
    getProductsInCart,
    postProductInCart,
    deleteProductInCart,
} from './controllers'

const Cart = Router()

Cart.get('/:id?', getCarts)

Cart.post('/', postCarts)

Cart.put('/:id', putCarts)

Cart.delete('/:id', deleteCarts)

export default Cart
