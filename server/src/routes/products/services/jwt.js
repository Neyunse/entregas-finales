import { logger } from '../../../config/log'
import jsw from 'jsonwebtoken'
import { server_secret } from '../../../config/configApp'

const jwtGet = async (req, res, next) => {
    const bearerHeader = req.headers['authorization']

    try {
        if (typeof bearerHeader === 'undefined') {
            return res
                .status(400)
                .send({ error: { message: 'Bearer token was undefined' } })
        }

        const bearer = bearerHeader.split(' ')

        const bearerToken = bearer[1]

        await jsw.verify(bearerToken, server_secret, (err, decoded) => {
            if (err) {
                logger.error(err)
                return res.status(401).send({ error: { message: err.message } })
            }

            req.token = bearerToken
            req.tokenizedUser = decoded

            next()
        })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export { jwtGet }
