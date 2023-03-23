import { Router } from 'express'

import {
    postCart,
    deleteCart,
    getProductsInCart,
    postProductInCart,
    deleteProductInCart,
} from './controllers'

const Cart = Router()

Cart.delete('/:id?', deleteCart)

Cart.post('/', postCart)

Cart.get('/:id', getProductsInCart)

Cart.post('/:id/products/:id_prod', postProductInCart)

Cart.delete('/:id/products/:id_prod', deleteProductInCart)


export default Cart
