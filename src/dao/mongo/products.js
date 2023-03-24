import pr from './schemas/products'
import uniqid from "uniqid";

export default class Products {
    constructor(route) {
        this.route = route
    }
    // Local Functios

    async __find(obj) {
        return pr.find(obj)
    }

    async __findOne(obj) {
        return pr.findOne(obj)
    }

    async findByIdAndUpdate(id, obj) {
        return pr.findByIdAndUpdate(id, obj)
    }

    async findByIdAndDelete(id) {
        const dl = pr.deleteOne({ _id: id })
        return dl
    }

    async __findById(id) {
        return pr.findById(id)
    }

    // Global Functions
    async getAll() {
        const all = await this.__find()
        if (all.length) return all

        return []
    }

    async save(obj) {
        const exist = await this.__findOne({ name: obj.name })
        if (exist) return 'This product already exists.'
        obj.code = uniqid()
        const newObj = await pr.create(obj)

        return newObj
    }

    async update(id, obj) {
        const find = await this.findByIdAndUpdate(id, obj)

        return find
    }

    async getById(int) {
        const getById = await this.__findById(int)
        return getById
    }

    async delById(int) {
        const del = await this.findByIdAndDelete(int)

        return del
    }
}
