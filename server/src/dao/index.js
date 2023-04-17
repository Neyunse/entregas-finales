import db from '../config/mongo.js'

const DAO_ENV = 'mongo'

let Products
let Cart

switch (DAO_ENV) {
    case 'mongo':
        db()

        const { default: MongoProducts } = await import(
            './collection/products.js'
        )
        const { default: MongoCart } = await import('./collection/cart.js')

        Products = () => new MongoProducts()
        Cart = () => new MongoCart()

        break

 
}

export { Products, Cart, DAO_ENV }
