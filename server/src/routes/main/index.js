import { Router } from 'express'
import index from './controllers'
const Main = Router()

Main.get('/', index)

export default Main
