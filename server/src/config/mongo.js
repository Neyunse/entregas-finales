import mongoose from 'mongoose'
import { mongoURL } from './configApp'
import { logger } from './log'
const db = async () => {
    try {
        return await mongoose
            .connect(mongoURL)
            .then(() => logger.info('MONGO Connected!'))
            .catch((err) => logger.error(err))
    } catch (error) {
        logger.error(error)
    }
}

export default db
