import { Router } from 'express'
import { info, uploadinfo } from './controllers'

const Main = Router()

Main.get('/info', info)
Main.get('/uploads-info', uploadinfo)

export default Main
