import { Cart } from '../../../dao'
import { products } from '../../products/controllers'
const carts = Cart()

export async function deleteCart(req, res) {
    const { id } = req.params
    try {
        const cart = await carts.getById(id)
        if (cart) {
            await carts.delById(id)
            return res.status(200).json({ status: 'ok', deletedCart: id })
        }

        return res.status(404).json({ status: '?', message: 'Cart not found' })
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            message: error.message,
        })
    }
}

export async function deleteProductInCart(req, res) {
    const { id_prod } = req.params
    const user = req.tokenizedUser
    try {
        const cart = await carts.getById(user.cart_id)
        const newCartProducts = cart.products.filter((product) => {
            return product._id != id_prod
        })

        cart.products = newCartProducts
        const updatedCartId = await carts.updateProducts(user.cart_id, cart)
        res.json({
            status: 'ok',
            updatedCart: updatedCartId,
            productDeletedId: id_prod,
        })
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            message: error.message,
        })
    }
}

export async function getProductsInCart(req, res) {
    const user = req.tokenizedUser
    try {
        const cart = await carts.getById(user.cart_id, {
            populate: true,
            collection: 'products._id',
        })
        const products = cart.products.map((p) => p._id)
        return res.send({ products })
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            message: error.message,
        })
    }
}

export async function postProductInCart(req, res) {
    const { id_prod } = req.params
    const user = req.tokenizedUser
    try {
        const cart = await carts.getById(user.cart_id)
        const existInCart = cart.products.find((game) => game.id === id_prod)
        if (existInCart) {
            return res.status(400).send({
                error: {
                    message: 'This game already exists in the cart.',
                },
            })
        }

        cart.products.push({ _id: id_prod })

        await carts.updateProducts(cart._id, { products: cart.products })

        res.send({
            status: 'ok',
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

    
