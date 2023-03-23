import mongoose from 'mongoose'
import { mongoURL } from './configApp'
import { logger } from './log'
const db = async () => {
    return await mongoose
        .connect(mongoURL)
        .then(() => logger.info('Connected!'))
        .catch((err) => logger.error(err))
}

export default db
