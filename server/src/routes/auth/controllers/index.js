import UserModel from '../../../dao/schemas/user'
import { createHash, validatePassword } from '../services'
import jwt from 'jsonwebtoken'
import { server_secret, PORT } from '../../../config/configApp'
import transporter, { email_app } from '../../../config/mail'
import { logger } from '../../../config/log'
import CartModel from '../../../dao/schemas/cart'
const proccess_type = process.env.NODE_TYPE

const register = async (req, res) => {
    try {
        const file = req.file

        const { username, email, password } = req.body

        if (!username || !password || !email) {
            return res.status(400).send('Incomplete fields')
        }

        const exist = await UserModel.findOne({ email })

        if (exist) return res.status(401).send('This user already exists')

        const Hash = await createHash(password)

        const cart = await CartModel.create({ products: [] })

        const create = await UserModel.create({
            username,
            email,
            password: Hash,
            cart: cart._id,
            avatar: file
                ? proccess_type == 'DEV'
                    ? `${req.protocol}://${req.hostname}:${PORT}/upload/avatar/${file.filename}`
                    : `${req.protocol}://${req.hostname}/upload/avatar/${file.filename}`
                : null,
        })

        await transporter.sendMail({
            from: `E-commerce App <${email_app}>`,
            to: email_app,
            subject: 'New user created',
            html: `${email} was successfully registered`,
        })

        logger.info('User created, and email sended')
        return res.send({
            user: create,
        })
    } catch (error) {
        return res.status(500).send({
            message: error.message,
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) return new Error('Empty fields')

        const findUser = await UserModel.findOne({ email })

        if (!findUser) return new Error('This user does not exist')

        const isValidPassword = await validatePassword(
            password,
            findUser.password
        )

        if (!isValidPassword) return new Error('invalid password')

        const tokenizeUser = {
            id: findUser._id,
            cart_id: findUser.cart,
            auth_type: findUser.role,
        }

        const token = jwt.sign(tokenizeUser, server_secret, {
            expiresIn: '1d',
        })

        return res.send({
            access_token: token,
            user: {
                ...tokenizeUser,
            },
        })
    } catch (error) {
        return res.status(500).send({
            message: error.message,
        })
    }
}

const me = async (req, res) => {
    try {
        const findUser = await UserModel.findOne({ _id: req.tokenizedUser.id })
        if (!findUser)
            return res.status(404).send({
                message: 'This user not exists.',
            })

        return res.send({
            username: findUser.username,
            email: findUser.email,
            role: findUser.role,
            avatar: findUser.avatar,
        })
    } catch (error) {
        return res.status(500).send({
            message: error.message,
        })
    }
}

export { login, register, me }
