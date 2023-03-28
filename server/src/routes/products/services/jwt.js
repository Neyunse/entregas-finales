import jsw from 'jsonwebtoken'
import { server_secret } from '../../../config/configApp'

const jwtGet = (req, res, next) => {


    const bearerHeader = req.headers['authorization']

    if (typeof bearerHeader !== 'undefined') {
        try {
         
            const bearer = bearerHeader.split(' ')
      
            const bearerToken = bearer[1]
            const user = jsw.verify(bearerToken, server_secret)

            if (user) {
               
                req.token = bearerToken
                req.tokenizedUser = user

                next()
            }

            return new Error('Invalid bearer token')
        } catch (error) {
            return res.status(401).send({
                message: error.message,
            })
        }
    } else {
        return res.status(500).send("Fobidden")
    }
}

export { jwtGet }
