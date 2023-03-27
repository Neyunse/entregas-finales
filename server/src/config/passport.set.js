import passport from 'passport'
import local from 'passport-local'
import UserModel from '../dao/mongo/schemas/user'

import { validatePassword } from '../routes/auth/services'

const LocalStrategy = local.Strategy

const initializePassport = () => {
    passport.use(
        'login',
        new LocalStrategy(
            {
                usernameField: 'email',
            },
            async (email, password, done) => {
                if (!email || !password)
                    return done(null, false, 'Empty fields')
                const findUser = await UserModel.findOne({ email })

                if (!findUser) return done(null, false, 'User not found')

                const isValidPassword = await validatePassword(
                    password,
                    findUser.password
                )

                if (!isValidPassword)
                    return done(null, false, 'Invalid password')

                return done(null, findUser)
            }
        )
    )
}

export default initializePassport
