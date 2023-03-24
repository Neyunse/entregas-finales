import { Cart } from '../../../dao'
import { products } from '../../products/controllers'
const carts = Cart('../../../local/cart.json')

export async function deleteCart(req, res) {
    const id = await carts.deleteById(req.params.id)
    res.status(200).json({ status: 'ok', deletedCart: id })
}

export async function deleteProductInCart(req, res) {
    const { id, id_prod } = req.params
    const cart = carts.getById(id)

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
    const cart = carts.getById(req.params.id)
    res.status(200).json(cart.products)
}

export async function postCart(req, res) {
    const newCart = { timestamp: Date.now(), products: [] }
    const idNew = await carts.save(newCart)
    res.status(201).json({ status: 'ok', newCartId: idNew })
}

export async function postProductInCart(req, res) {
    const cartId = req.params.id
    const productId = req.params.id_prod

    const cart = carts.getById(cartId)
    const product = products.getById(productId)

    cart.products.push(product)

    const updatedCartId = await carts.update(cartId, cart)
    res.status(201).json({
        status: 'ok',
        updatedCart: updatedCartId,
        productAdded: product,
    })
}
