import minimist from 'minimist'
import InfoDTO from '../../../dto/info.js'
const args = minimist(process.argv.slice(2))

const index = (req, res) => {
    res.send('Home')
}

const info = (req, res) => {
    const infoServer = InfoDTO.get(args, process)
    res.send(infoServer)
}

export default index

export { info }
