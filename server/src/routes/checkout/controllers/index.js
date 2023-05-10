import { Cart } from '../../../dao'
import UserModel from '../../../dao/schemas/user'
import transporter from '../../../config/mail'
import { email_app } from '../../../config/mail'
const carts = Cart()


const processPayment = async (req, res) => {
    try {
        const cart = await carts.getById(req.tokenizedUser.cart_id, {
            populate: true,
            collection: 'products._id',
        })
        const user = await UserModel.findOne({ _id: req.tokenizedUser.id })

        if (!user) return res.status(404).send({ message: 'user not found' })

        const buyedProducts = cart.products
            .map((p) => {
                return `${p._id.name} - ${p._id.price} usd`
            })
            .join('<br>')
        

        await UserModel.findByIdAndUpdate(
              { _id: req.tokenizedUser.id },
              { library: [...user.library, ...cart.products] }
        )

        const html_pro = `<h1>Nuevo Pedido</h1>
            ${buyedProducts}`

        await transporter.sendMail({
              from: `E-commerce App <${email_app}>`,
              to: user.email,
              subject: 'Your order has been received and is being processed.',
              html: html_pro,
        })

        await carts.clearCart(req.tokenizedUser.cart_id)

        return res.send({
              status: 'success',
              message: 'Your payment has been successfully!',
        })
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            message: error.message,
        })
    }
}

export { processPayment }
