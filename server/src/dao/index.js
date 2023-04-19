import db from '../config/mongo.js'
const { default: MongoProducts } = await import('./collection/products.js')
const { default: MongoCart } = await import('./collection/cart.js')

db()

const Products = () => new MongoProducts()
const Cart = () => new MongoCart()

export { Products, Cart }
