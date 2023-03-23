import mongoose from 'mongoose'

const table_collection = 'cart'

const schema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now,
    },
    products: Object,
})

const cr = mongoose.model(table_collection, schema)

export default cr
