import minimist from 'minimist'
import InfoDTO from '../../../dto/info.js'
import { __readdir } from '../../../utils.js'
const args = minimist(process.argv.slice(2))

const info = (req, res) => {
      const infoServer = InfoDTO.get(args, process)
      res.send(infoServer)
}

const uploadinfo = async (req, res) => {
      const files = await __readdir('./src/upload/**')
      res.send(files)
}

export { info, uploadinfo }
