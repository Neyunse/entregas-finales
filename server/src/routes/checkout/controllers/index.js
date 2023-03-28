import { Cart } from '../../../dao'
import UserModel from '../../../dao/mongo/schemas/user'
import transporter from '../../../config/mail'
import { email_app } from '../../../config/mail'
const carts = Cart('../../../local/cart.json')

const processPayment = async (req, res) => {
    const { cid } = req.params
    const cart = await carts.getById(cid)
    if (cart && cart.uid === req.tokenizedUser.id) {
        const user = await UserModel.findOne({ _id: req.tokenizedUser.id })

        if (user) {
            const buyedProducts = cart.products
                .map((p) => {
                    return `${p.name} - ${p.price}`
                })
                .join('<br>')

            const html_pro = `<h1>Nuevo Pedido</h1>
            ${buyedProducts}`

            await transporter.sendMail({
                from: `E-commerce App <${email_app}>`,
                to: user.email,
                subject: 'Your order has been received and is being processed.',
                html: html_pro,
            })

            await carts.delById(cid)

            return res.send({
                status: 'success',
                message: 'Your payment has been successfully!',
            })
        }

        return res.status(404).send({
            status: 'error',
            message: 'User not found',
        })
    }

    return res.status(404).send({
        status: 'error',
        message: "You don't have any products to purchase.",
    })
}

export { processPayment }
