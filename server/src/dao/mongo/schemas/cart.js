import mongoose from 'mongoose'

const table_collection = 'cart'

const schema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now,
    },
    products: Object,
    uid: {
        type: String,
        unique: true,
        required: true,
    },
})

const cr = mongoose.model.cart || mongoose.model(table_collection, schema)

export default cr
