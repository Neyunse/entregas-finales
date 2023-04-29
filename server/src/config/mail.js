'use strict'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
/*------------------------------------------*/
dotenv.config({
    path: 'src/.env',
})
/*------------------------------------------*/
const email_app = process.env.EMAIL_USER
const transporter = nodemailer.createTransport({
    service: 'gmail',

    auth: {
        user: email_app,
        pass: process.env.EMAIL_PASSWORD,
    },
})

export default transporter
export { email_app }
