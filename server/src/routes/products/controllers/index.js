import { Products } from '../../../dao'
const products = Products()
import ProductsDTO from '../../../dto/products.js'
const deleteProducts = async (req, res) => {
    if (req.tokenizedUser.auth_type !== 'admin') {
        return res.status(401).json({
            error: 401,
            descripcion: 'You do not have sufficient permissions',
            route: req.originalUrl,
        })
    }

    try {
        const id = await products.delById(req.params.id)
        res.status(200).json({ status: 200, deletedProduct: id })
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            message: error.message,
        })
    }
}

const getProducts = async (req, res) => {
    try {
        res.status(200).json(
            !req.params.id
                ? await products.getAll()
                : await products.getById(req.params.id)
        )
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            message: error.message,
        })
    }
}

const postProducts = async (req, res) => {
    const { name, description, image, price } = req.body

    try {
        if (!name || !description || !image || !price) {
            return res
                .status(400)
                .send({ error: { message: 'some fields are required' } })
        }

        if (req.tokenizedUser.auth_type !== 'admin') {
            return res.status(401).json({
                error: 401,
                descripcion: 'You do not have sufficient permissions',
                route: req.originalUrl,
            })
        }

        const newProduct = ProductsDTO.get(req.body)

        const idNew = await products.save(newProduct)
        res.status(201).json({
            status: 201,
            newProductId: idNew,
        })
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            message: error.message,
        })
    }
}

const putProducts = async (req, res) => {
    const { name, description, image, price } = req.body
    try {
        if (req.tokenizedUser.auth_type !== 'admin') {
            return res.status(401).json({
                error: 401,
                descripcion: 'You do not have sufficient permissions',
                route: req.originalUrl,
            })
        }

        const { id } = req.params

        if (!name || !description || !image || !price) {
            return res
                .status(400)
                .send({ error: { message: 'some fields are required' } })
        }
        if (!id) {
            return res
                .status(400)
                .send({ error: { message: 'Id parameter is missing' } })
        }

        const updatedProduct = ProductsDTO.get(req.body)

        const product = await products.update(id, updatedProduct)

        return res.status(200).json({ status: 200, updatedProduct: product })
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            message: error.message,
        })
    }
}

export { deleteProducts, postProducts, getProducts, putProducts, products }
