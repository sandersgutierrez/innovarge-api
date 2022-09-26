'use strict'

import { Router } from 'express'
import {
    getUser,
    getUsers,
    saveUser,
    updateUser,
    deleteUser,
} from '../controllers/userController.js'

const api = Router()

api.get('/users', getUsers)
api.get('/users/:userId', getUser)
api.post('/users', saveUser)
api.put('/users/:userId', updateUser)
api.delete('/users/:userId', deleteUser)

export default api
