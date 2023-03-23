'use strict'
import express from 'express'
import cors from 'cors'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import { PORT, mongoURL, server_secret } from './config/configApp.js'
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
    })
)
app.use(passport.initialize())
app.use(passport.session())
/*------------------------------------------*/

app.listen(SERVER_PORT, () =>
    console.log(`PORT:${SERVER_PORT}`, `PID:${process.pid}`)
)
