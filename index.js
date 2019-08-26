const bunyan = require('bunyan')
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const pj = require('./package.json')

// load env variables
require('dotenv').config({ path: `${__dirname}/.env` })

// create new logger
const log = bunyan.createLogger({
    name: pj.name,
    streams: [
        { level: bunyan.INFO, stream: process.stdout },
        { level: bunyan.TRACE, path: `${__dirname}/logs/${pj.name}.trace.log` }
    ]
})

function main() {
    const { HOST, PORT, CORS } = process.env
    if (!HOST) throw new Error('hostname is undefined')
    if (!PORT) throw new Error('port number is undefined')

    const api = express()

    // enable cors
    if (CORS && CORS.toLocaleLowerCase() == "true") {
        api.use(cors())
        log.info('cors enabled')
    }

    // enable parsing incoming request with json payload
    api.use(express.json())

    // inject logger
    api.use((req, res, next) => {
        req.logger = log
        next()
    })

    // load routes
    let routesDirectories = fs.readdirSync(`${__dirname}/routes`)
    for(routeDirectory of routesDirectories) {
        let routePath = `${__dirname}/routes/${routeDirectory}`
        let stat = fs.statSync(routePath)
        if (stat.isDirectory() && fs.existsSync(`${routePath}/index.js`)) {
            api.use(require(routePath))
            log.info(`route ${routeDirectory} loaded`)
        }
    }

    // start API
    api.listen(PORT, HOST, (error) => {
        if (error) {
            throw error
        }
        log.info(`API server ready on ${HOST}:${PORT}`)
    })
}

try {
    main()
} catch(error) {
    log.fatal(error)
    process.exit()
}