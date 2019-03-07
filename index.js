require('dotenv').config({ path: `${__dirname}/.env` })
const bunyan = require('bunyan')
const express = require('express')
const cors = require('cors')

const log = bunyan.createLogger({
    name: 'General Purpose API',
    streams: [
        { stream: process.stdout },
        { level: 'info', path: './logs/gp.out.log' },
        { level: 'error', path: './logs/gp.error.log' }
    ]
})

function main() {
    const { HOST, PORT } = process.env
    if (!HOST) throw new Error('hostname is undefined')
    if (!PORT) throw new Error('port number is undefined')

    const api = express()

    api.use(cors())
    api.use(express.json())

    api.get('/api/v1.0/status', (req, res) => {
        res.send('ok')
    })

    api.listen(PORT, HOST, (error) => {
        if (error) {
            log.fatal(error)
            process.exit()
        }
        log.info(`General Purpose API service listening on ${HOST}${PORT}`)
    })
}

try {
    main()
} catch(error) {
    log.fatal(error)
}