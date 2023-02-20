import mongoose from 'mongoose'

const table_collection = "products"

const schema = new mongoose.Schema({
      timestamp: {
            type: Date,
            default: Date.now
      },
      name: {
            type: String,
            unique: true,
      },
      description: String,
      image: String,
      price: Number,
      stock: Number,
      code: String
})


const pr = mongoose.model(table_collection, schema);

export default pr