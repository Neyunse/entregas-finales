import { Router } from 'express'
import passport from 'passport'
import uploader from './services/upload'
import { login, register } from './controllers'

const auth = Router()

auth.post('/register', uploader.single('avatar'), register)

auth.post(
    '/login',
    passport.authenticate('login', {
        failureMessage: true,
    }),
    login
)

export default auth
