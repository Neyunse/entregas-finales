'use strict'
import express from 'express'
import fs from 'fs'
import cors from 'cors'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import { PORT, mongoURL, server_secret } from './config/configApp.js'
import routes from './routes/index.js'
import { logger } from './config/log.js'
import { __dirname, __path } from './utils.js'
/*------------------------------------------*/
const app = express()
const SERVER_PORT = process.env.PORT || PORT
/*------------------------------------------*/
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use('/upload', express.static(__dirname + '/upload'))
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
/*------------------------------------------*/
const avatar_folder = 'upload/avatar'

if (!fs.existsSync(__dirname + '/' + avatar_folder)) {
      fs.mkdirSync(__dirname + '/' + avatar_folder, { recursive: true })
      logger.info(`${__path("./"+avatar_folder)}`)
}
 