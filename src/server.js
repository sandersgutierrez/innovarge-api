'use strict'

import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import api from './routes/api.js'

const server = express()

server.use(bodyParser.json())
server.use(cookieParser())

server.use('/api/v1', api)

export default server
