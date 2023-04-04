import { Router } from 'express'
import uploader from './services/upload'
import { login, register, me } from './controllers'
import { jwtGet } from '../../routes/products/services/jwt'
const auth = Router()

auth.post('/register', uploader.single('avatar'), register)

auth.post('/login', login)

auth.get('/user/me', jwtGet, me)

export default auth
