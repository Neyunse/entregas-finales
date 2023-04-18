import mongoose from 'mongoose'

const table_collection = 'Users'

const schema = new mongoose.Schema({
    username: String,
    avatar: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: String,
    age: Number,
    name: String,
    direction: String,
    library: Map,
    cart: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'cart',
    },
    role: {
        type: String,
        default: 'user',
    },
})

const UserModel =
    mongoose.model.Users || mongoose.model(table_collection, schema)

export default UserModel
