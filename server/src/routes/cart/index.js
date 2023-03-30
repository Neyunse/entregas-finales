import { Router } from 'express'

import {
    deleteCart,
    getProductsInCart,
    postProductInCart,
    deleteProductInCart,
    makeCartAndPostProduct,
} from './controllers'

import { jwtGet } from '../products/services/jwt'

const Cart = Router()

Cart.delete('/del/:id?', deleteCart)

// Cart.post('/new', postCart)

Cart.post('/new/:id_prod', jwtGet, makeCartAndPostProduct)

Cart.get('/:id', getProductsInCart)

Cart.post('/add/:id/products/:id_prod', postProductInCart)

Cart.delete('/del/:id/products/:id_prod', deleteProductInCart)



export default Cart
