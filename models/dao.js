import db from '../DB/mongo.js'

const DAO_ENV = process.env.DAO

let Products
let Cart

switch (DAO_ENV) {
      case 'mongo':
            db()

            const {default: MongoProducts} = await import('../models/mongo/products.js')
            const {default: MongoCart} = await import('../models/mongo/cart.js')
            
            Products = new MongoProducts()
            Cart = new MongoCart()

            break;
      
      case 'fs':
            const {default:FsProducts} = await import('../models/fs/products.js')
            const {default: FsCart} = await import('../models/fs/cart.js')

            Products = new FsProducts()
            Cart = new FsCart()


            break;
      default:

            const {default:DefaultProduct} = await import('../models/fs/products.js')
            const {default:DefaultCart} = await import('../models/fs/cart.js')

            Products = new DefaultProduct()
            Cart = new DefaultCart()


            break;
}

export {
      Products,
      Cart
}