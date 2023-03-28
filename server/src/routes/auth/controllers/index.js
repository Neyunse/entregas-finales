import UserModel from '../../../dao/mongo/schemas/user'
import { createHash, validatePassword } from '../services'
import jwt from 'jsonwebtoken'
import { server_secret } from '../../../config/configApp'
import transporter, { email_app } from '../../../config/mail'
import { logger } from '../../../config/log'
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

        const create = await UserModel.create({
            username,
            email,
            password: Hash,
            avatar: file
                ? proccess_type == 'DEV'
                    ? `${req.protocol}://${req.hostname}:${process.env.PORT}/upload/${file.filename}`
                    : `${req.protocol}://${req.hostname}/upload/${file.filename}`
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
        return res.status(401).send({
            message: error.message,
        })
    }
}

export { login, register }