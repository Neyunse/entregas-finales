import db from '../config/mongo.js'

const DAO_ENV = 'mongo'

let Products
let Cart

switch (DAO_ENV) {
    case 'mongo':
        db()

        const { default: MongoProducts } = await import('./mongo/products.js')
        const { default: MongoCart } = await import('./mongo/cart.js')

        Products = (mp) => new MongoProducts(mp)
        Cart = (mc) => new MongoCart(mc)

        break

    case 'fs':
        const { default: FsProducts } = await import('./fs/products.js')
        const { default: FsCart } = await import('./fs/cart.js')

        Products = (pf) => new FsProducts(pf)
        Cart = (cf) => new FsCart(cf)

        break
 
}

export { Products, Cart, DAO_ENV }
