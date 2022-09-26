'use strict'

import { Config } from './lib/config.js'
import server from './server.js'
import './lib/database.js'

const config = Config()

server.listen(config.port, config.host, () => {
    console.log(`Server is running at http:${config.host}:${config.port}`)
})
