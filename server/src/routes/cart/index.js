import { Router } from 'express'

import {
    deleteCart,
    getProductsInCart,
    postProductInCart,
    deleteProductInCart,
} from './controllers'

import { jwtGet } from '../products/services/jwt'

const Cart = Router()

Cart.get('/my/:id', jwtGet, getProductsInCart)

Cart.post('/add/products/:id_prod', jwtGet, postProductInCart)

Cart.delete('/del/products/:id_prod', jwtGet, deleteProductInCart)



export default Cart
