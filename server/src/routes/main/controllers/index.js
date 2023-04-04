import minimist from 'minimist'

const args = minimist(process.argv.slice(2))

const index = (req, res) => {
    res.send('Home')
}

const info = (req, res) => {
    res.send({
        args,
        so: process.platform,
        node: process.version,
        reserved_memory: process.memoryUsage().heapUsed,
        root: process.cwd(),
        root_folder: process.cwd().split('\\').pop(),
        process_id: process.pid,
    })
}

export default index

export { info }
