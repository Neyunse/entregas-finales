import { Cart } from '../../../dao'
import { products } from '../../products/controllers'
const carts = Cart('../../../local/cart.json')

export async function deleteCart(req, res) {
    const { id } = req.params
    const cart = await carts.getById(id)
    if (cart) {
        await carts.delById(id)
        return res.status(200).json({ status: 'ok', deletedCart: id })
    }

    return res.status(404).json({ status: '?', message: 'Cart not found' })
}

export async function deleteProductInCart(req, res) {
    const { id, id_prod } = req.params
    const cart = await carts.getById(id)

    const newCartProducts = cart.products.filter((producto) => {
        return producto.id != id_prod
    })

    cart.products = newCartProducts
    const updatedCartId = await carts.update(id, cart)
    res.status(201).json({
        status: 'ok',
        updatedCart: updatedCartId,
        productDeletedId: id_prod,
    })
}

export async function getProductsInCart(req, res) {
    const { id } = req.params
    const cart = await carts.getById(id)

    if (cart) {
        return res.send({ cart })
    }

    return res.status(404).send({
        status: 'error',
        message: "You don't have any products to purchase.",
    })
}

// export async function postCart(req, res) {
//     const newCart = { timestamp: Date.now(), products: [] }
//     const idNew = await carts.save(newCart)
//     res.status(201).json({ status: 'ok', newCartId: idNew })
// }

export const makeCartAndPostProduct = async (req, res) => {
    const { id_prod } = req.params

    try {
        const product = await products.getById(id_prod)
        const newCart = {
            timestamp: Date.now(),
            products: [product],
            uid: req.tokenizedUser.id,
        }
        const cartResult = await carts.save(newCart)
        res.status(201).json({ status: 'ok', cartId: cartResult._id })
    } catch (error) {
        return res.status(400).json({ error: { message: error.message } })
    }
}

export async function postProductInCart(req, res) {
    const { id_prod, id } = req.params

    const cart = await carts.getById(id)
    const product = await products.getById(id_prod)

    if (cart) {
        const product_arr = [...cart.products, product]

        const updatedCartId = await carts.updateProducts(id, product_arr)
        return res.send({
            status: 'ok',
            updatedCart: updatedCartId,
            productAdded: product,
        })
    }

    return res
        .status(404)
        .json({ error: { message: 'Your cart was not found' } })
}
