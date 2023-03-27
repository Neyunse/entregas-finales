import UserModel from 'dao/mongo/schemas/user'
import { createHash } from '../services'
import jwt from 'jsonwebtoken'
import { server_secret } from 'config/configApp'

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
    if (!req.session.messages) {
        const findUser = req.user

        req.session.user = {
            id: findUser._id,
            username: findUser.username,
            email: findUser.email,
            auth_type: findUser.role,
        }

        const token = jwt.sign(req.session.use, server_secret, {
            expiresIn: '1d',
        })

        return res.send({
            access_token: token,
            user: {
                ...req.session.user,
            },
        })
    }

    return res.status(400).send({ message: req.session.messages })
}

export { login, register }
