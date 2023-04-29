'use strict'
import jwt from 'jsonwebtoken'
import { server_secret } from './src/config/configApp.js'

const tokenizeUser = {
      id: 0,
      cart_id: null,
      auth_type: 'admin',
}

const token = jwt.sign(tokenizeUser, server_secret)

const decoded = jwt.verify(token, server_secret)

console.log('token: ', token)
console.log('decoded: ', decoded)
