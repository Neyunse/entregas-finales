import { Router } from 'express'
import index,{info} from './controllers'
const Main = Router()

Main.get('/', index)
Main.get('/info', info)


export default Main
