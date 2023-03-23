'use strict'
import dotenv from 'dotenv'
/*------------------------------------------*/
dotenv.config({
    path: 'src/.env',
})
/*------------------------------------------*/
const mongoURL = process.env.MONGO_URL
const PORT = 8080
const server_secret = process.env.SERVER_SECRET
/*------------------------------------------*/
export { mongoURL, PORT, server_secret }
