import UserModel from '../../../dao/schemas/user'
import { createHash, validatePassword } from '../services'
import jwt from 'jsonwebtoken'
import { server_secret, PORT } from '../../../config/configApp'
import transporter, { email_app } from '../../../config/mail'
import { logger } from '../../../config/log'
import CartModel from '../../../dao/schemas/cart'
const proccess_type = process.env.NODE_TYPE
import UserDTO from '../../../dto/user.js'
const register = async (req, res) => {
      try {
            const file = req.file

            const { username, email, password } = req.body

            if (!username || !password || !email) {
                  return res.status(400).send({
                        error: {
                              message: 'Incomplete fields',
                        },
                  })
            }

            const exist = await UserModel.findOne({ email })

            if (exist)
                  return res.status(401).send({
                        error: {
                              message: 'This user already exists',
                        },
                  })

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
                  error: {
                        message: error.message,
                  },
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

            const tokenizeUser = UserDTO.jwt(findUser)

            const token = jwt.sign(tokenizeUser, server_secret, {
                  expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            })

            return res.send({
                  access_token: token,
                  user: {
                        ...tokenizeUser,
                  },
            })
      } catch (error) {
            return res.status(500).send({
                  error: {
                        message: error.message,
                  },
            })
      }
}

const me = async (req, res) => {
      try {
            const { data } = req.query
            if (data == 'populate') {
                  const findUser = await UserModel.findOne({
                        _id: req.tokenizedUser.id,
                  }).populate('library._id')

                  if (!findUser)
                        return res.status(404).send({
                              message: 'This user not exists.',
                        })

                  const payload = UserDTO.get(findUser)

                  return res.send({ ...payload })
            }
            const findUser = await UserModel.findOne({
                  _id: req.tokenizedUser.id,
            })
            if (!findUser)
                  return res.status(404).send({
                        message: 'This user not exists.',
                  })

            const payload = UserDTO.get(findUser)

            return res.send({ ...payload })
      } catch (error) {
            return res.status(500).send({
                  message: error.message,
            })
      }
}

const drop = async (req, res) => {
    const drop_User = await UserModel.collection.drop()

    res.send('OK')
}

export { login, register, me, drop }
