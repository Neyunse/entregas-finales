import db from '../DB/mongo.js'

const DAO_ENV = process.env.DAO

let Products
let Cart

switch (DAO_ENV) {
      case 'mongo':
            db()

            const {default: MongoProducts} = await import('../models/mongo/products.js')
            const {default: MongoCart} = await import('../models/mongo/cart.js')
            
            Products = (mp) => new MongoProducts(mp)
            Cart = (mc) => new MongoCart(mc)

            break;
      
      case 'fs':
            const {default:FsProducts} = await import('../models/fs/products.js')
            const {default: FsCart} = await import('../models/fs/cart.js')

            Products = (pf) => new FsProducts(pf)
            Cart = (cf) => new FsCart(cf)


            break;
      default:

            const {default:DefaultProduct} = await import('../models/fs/products.js')
            const {default:DefaultCart} = await import('../models/fs/cart.js')

            Products = (dp) => new DefaultProduct(dp)
            Cart = (dc) => new DefaultCart(dc)


            break;
}

export {
      Products,
      Cart,
      DAO_ENV
}