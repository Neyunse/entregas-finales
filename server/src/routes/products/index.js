import { Router } from 'express'

import {
    getProducts,
    postProducts,
    putProducts,
    deleteProducts,
} from './controllers'

const Product = Router()

Product.get('/:id?', getProducts)

Product.post('/', postProducts)

Product.put('/:id', putProducts)

Product.delete('/:id', deleteProducts)

export default Product
