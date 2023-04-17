import cr from '../schemas/cart'
export default class Cart {
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

    async updateProducts(id, cart) {
        return await cr.findByIdAndUpdate(id, { $set: cart })
    }

    /**
     * This is an asynchronous function that finds a document by its ID and optionally populates a
     * specified collection.
     * @param int - The parameter "int" is an integer value that represents the unique identifier of
     * the document being searched for in the database.
     * @param [options] - An object that contains additional options for the function. It is an
     * optional parameter and defaults to an empty object if not provided.
     * @returns The function `getById` is returning a promise that resolves to the result of a
     * `findOne` query on the `cr` collection with the specified `_id`. If the `options.populate`
     * property is truthy, the query result will also be populated with the specified
     * `options.collection`. The function is using `async/await` syntax to handle the asynchronous
     * nature of the query.
     */
    async getById(int, options = {}) {
        if (options.populate)
            return await cr.findOne({ _id: int }).populate(options.collection)
        return await cr.findOne({ _id: int })
    }

    async delById(int) {
        return await cr.deleteOne({ _id: int })
    }
}
