'use strict'
import express from 'express'
import cors from 'cors'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import { PORT, mongoURL, server_secret } from './config/configApp.js'
import routes from './routes/index.js'
import { logger } from './config/log.js'
import initializePassport from './config/passport.set.js'
/*------------------------------------------*/
const app = express()
const SERVER_PORT = process.env.PORT || PORT
/*------------------------------------------*/
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: mongoURL,
            ttl: 20,
        }),
        secret: server_secret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 10,
        },
    })
)
app.use(passport.initialize())
app.use(passport.session())

initializePassport()

/*------------------------------------------*/
app.use(routes)
app.use((req, res) => {
    res.json({
        error: {
            message: `Invalid url: ${req.originalUrl}'`,
        },
    })
})
/*------------------------------------------*/

app.listen(SERVER_PORT, () =>
    logger.info(`PORT:${SERVER_PORT}`, `PID:${process.pid}`)
)
