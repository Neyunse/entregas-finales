import { Router } from 'express'
import { info } from './controllers'

const Main = Router()

Main.get('/info', info)


export default Main
