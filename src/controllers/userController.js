'use strict'

import { User } from '../models/user.js'

export const getUsers = (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            return res.status(500).send({
                message: `Ha ocurrido un error al procesar la petición: ${err}.`,
            })
        }
        if (!users) {
            return res.status(500).send({
                message: 'No hay usuarios',
            })
        }
        res.status(200).send(users)
    })
}

export const getUser = (req, res) => {
    let { userId } = req.params
    User.findById(userId, (err, user) => {
        if (err) {
            res.status(500).send({
                message: `Ha ocurrido un error al procesar la petición: ${err}.`,
            })
        }
        if (!user) {
            res.status(500).send({
                message: 'El usuario no existe',
            })
        }
        res.status(200).send(user)
    })
}

/**
 * Registra nuevos usuarios
 */
export const saveUser = (req, res) => {
    /**
     * Verificar si la petición es válida y no está vacía o nula
     */
    if (
        req.body.firstname === null ||
        req.body.firstname === '' ||
        req.body.lastname === null ||
        req.body.lastname === '' ||
        req.body.email === null ||
        req.body.email === '' ||
        req.body.username === null ||
        req.body.username === '' ||
        req.body.password === null ||
        req.body.password === ''
    ) {
        res.status(500).send({
            success: false,
            message:
                'Asegúrese de que todos los campos obligatorios sean provisto',
        })
    }

    const user = new User()

    /**
     * Recupera el valor de cada campo desde la petición a User Object
     */
    user.name.first = req.body.firstname
    user.name.last = req.body.lastname
    user.email = req.body.email
    user.avatar = req.body.avatar
    user.username = req.body.username
    user.password = req.body.password

    user.save((err, userStored) => {
        if (err) {
            if (err.errors !== null) {
                if (err.errors.name) {
                    res.status(500).send({
                        success: false,
                        message: err.errors.name.message,
                    })
                } else if (err.errors.email) {
                    res.status(500).send({
                        success: false,
                        message: err.errors.email.message,
                    })
                } else if (err.errors.username) {
                    res.status(500).send({
                        success: false,
                        message: err.errors.username.message,
                    })
                } else if (err.errors.password) {
                    res.status(500).send({
                        success: false,
                        message: err.errors.password.message,
                    })
                } else {
                    res.status(500).send({
                        success: false,
                        message: err,
                    })
                }
            } else if (err) {
                if (err.code === 11000) {
                    if (err.errmsg[61] === 'u') {
                        res.status(500).send({
                            success: false,
                            message: 'El usuario ya existe',
                        })
                    } else if (err.errmsg[61] === 'e') {
                        res.status(500).send({
                            success: false,
                            message: 'El e-mail ya existe',
                        })
                    } else {
                        res.status(500).send({
                            success: false,
                            message: err,
                        })
                    }
                }
                res.status(500).send({
                    message: `Ha ocurrido un error al procesar la petición: ${err}.`,
                })
            }
        }
        
        res.status(200).send({
            success: true,
            message: 'Usuario registrado con éxito',
            user: userStored,
        })
    })
}

export const updateUser = (req, res) => {
    let { userId } = req.params
    let updateBody = req.body
    User.findByIdAndUpdate(userId, updateBody, { new: true }, (err, user) => {
        if (err) {
            res.status(500).send({
                message: `Ha ocurrido un error al procesar la petición: ${err}.`,
            })
        }
        res.status(201).send(user)
    })
}

export const deleteUser = (req, res) => {
    let { userId } = req.params
    User.findById(userId, (err, user) => {
        if (err) {
            res.status(500).send({
                message: `Ha ocurrido un error al procesar la petición: ${err}.`,
            })
        }
        user.remove(err => {
            if (err) {
                res.status(500).send({
                    message: `Ha ocurrido un error al procesar la petición: ${err}.`,
                })
            }
            res.status(200).send({
                message: 'El usuario ha sido eliminado.',
            })
        })
    })
}
