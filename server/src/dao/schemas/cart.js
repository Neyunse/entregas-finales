import mongoose from 'mongoose'

const table_collection = 'cart'

const schema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now,
    },
    products: [
        {
            _id: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'products',
            },
        },
    ]
})

const CartModel = mongoose.model.cart || mongoose.model(table_collection, schema)

export default CartModel
