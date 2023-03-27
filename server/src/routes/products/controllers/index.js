import { Products, DAO_ENV } from '../../../dao'
import { admin } from '../../../config/configApp'
const products = Products('../../../local/products.json')

const deleteProducts = async (req, res) => {
    if (admin)
        return res.status(401).json({
            error: 401,
            descripcion: 'The route in your petition is not authorized',
            route: req.originalUrl,
        })

    const id = await products.delById(req.params.id)
    res.status(200).json({ status: 200, deletedProduct: id })
}

const getProducts = async (req, res) => {
    res.status(200).json(
        !req.params.id
            ? await products.getAll()
            : await products.getById(req.params.id)
    )
}

const postProducts = async (req, res) => {
    if (admin)
        return res.status(401).json({
            error: 401,
            descripcion: 'The route in your petition is not authorized',
            route: req.originalUrl,
        })
    const { name, description, image, price, stock } = req.body

    let newProduct

    if (DAO_ENV == 'fs') {
        newProduct = {
            name,
            description,
            image,
            price,
            stock,
        }
    } else {
        newProduct = {
            name,
            description,
            image,
            price,
            stock,
        }
    }
    const idNew = await products.save(newProduct)
    res.status(201).json({ status: 201, newProductId: idNew })
}

const putProducts = async (req, res) => {
    if (admin)
        return res.status(401).json({
            error: 401,
            descripcion: 'The route in your petition is not authorized',
            route: req.originalUrl,
        })
    const { name, description, image, price, stock } = req.body
    const { id } = req.params
    let updatedProduct

    if (DAO_ENV == 'fs') {
        updatedProduct = {
            name,
            description,
            image,
            price,
            stock,
        }

        const id = await products.update(updatedProduct)

        return res
            .status(200)
            .json({ status: 200, updatedProduct: [await products.getById(id)] })
    } else {
        updatedProduct = {
            name,
            description,
            image,
            price,
            stock,
        }

        const product = await products.update(id, updatedProduct)

        return res.status(200).json({ status: 200, updatedProduct: product })
    }
}

export { deleteProducts, postProducts, getProducts, putProducts, products }
