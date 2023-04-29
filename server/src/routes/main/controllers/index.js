import minimist from 'minimist'
import InfoDTO from '../../../dto/info.js'
const args = minimist(process.argv.slice(2))

const info = (req, res) => {
    const infoServer = InfoDTO.get(args, process)
    res.send(infoServer)
}

export { info }
