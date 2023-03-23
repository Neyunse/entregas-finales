'use strict'
import { express } from 'express'
import cors from 'cors'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import dotenv from 'dotenv'
/*------------------------------------------*/
const app = express()
const PORT = process.env.PORT || 8080
/*------------------------------------------*/
dotenv.config({
    path: './.env.local',
})
/*------------------------------------------*/
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: mongoUrl,
            ttl: 20,
        }),
        secret: config.secret,
        resave: false,
        saveUninitialized: false,
    })
)
app.use(passport.initialize())
app.use(passport.session())
/*------------------------------------------*/

app.listen(PORT, () => console.log(`PORT:${PORT}`, `PID:${process.pid}`))
