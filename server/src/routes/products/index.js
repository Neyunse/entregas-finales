import { Router } from 'express'

import {
    getProducts,
    postProducts,
    putProducts,
    deleteProducts,
} from './controllers'

import { jwtGet } from './services/jwt'

const Product = Router()

Product.get('/:id?', getProducts)

Product.post('/', jwtGet, postProducts)

Product.put('/:id', jwtGet, putProducts)

Product.delete('/:id', jwtGet, deleteProducts)

export default Product
