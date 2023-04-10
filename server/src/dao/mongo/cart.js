import cr from './schemas/cart'
import duplicatedError from 'mongoose-duplicate-key-error'
export default class Cart {
    constructor(route) {
        this.route = route
    }

    async getAll() {
        const all = await cr.find()
        if (all.length) return all

        return []
    }

    async save(obj) {
        try {
            const create = await cr.create(obj)

            return create
        } catch (error) {
            return error.message
        }
    }

    async update(obj) {
        return await cr.findByIdAndUpdate({ _id: obj.id }, obj)
    }

    async updateProducts(id, product_arr) {
        return await cr.findByIdAndUpdate(
            { _id: id },
            {
                products: product_arr,
            }
        )
    }

    async getById(int) {
        return await cr.findOne({ _id: int })
    }

    async delById(int) {
        return await cr.deleteOne({ _id: int })
    }
}
