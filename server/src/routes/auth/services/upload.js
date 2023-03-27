import multer from 'multer'
import { __dirname } from 'utils'

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        return callback(null, `${__dirname}/upload/avatar/`)
    },
    filename: function (req, file, callback) {
        return callback(null, `${Date.now()}-${file.originalname}`)
    },
})

const uploader = multer({ storage })

export default uploader
