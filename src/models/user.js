'use strict'

import pkg from 'mongoose'
const { Schema, model } = pkg
import validate from 'mongoose-validator'
import titlize from 'mongoose-title-case'

const firstnameValidator = [
    validate({
        validator: 'matches',
        arguments: /^([a-zA-Z]{3,20})$/,
        message: '"firstname": Debe contener al menos 3 o un máximo de 15, no acepta carateres especiales o números.',
    }),
    validate({
        validator: 'isLength',
        arguments: [3, 15],
        message: '"firstname": Solo puede contener entre {ARGS[0]} y {ARGS[1]} caracteres.',
    }),
]

const lastnameValidator = [
    validate({
        validator: 'matches',
        arguments: /^([a-zA-Z]{3,20})$/,
        message: '"lastname": Debe contener al menos 3 o un máximo de 15, no acepta carateres especiales o números.',
    }),
    validate({
        validator: 'isLength',
        arguments: [3, 15],
        message: '"lastname": Solo puede contener entre {ARGS[0]} y {ARGS[1]} caracteres.',
    }),
]

const emailValidator = [
    validate({
        validator: 'matches',
        arguments: /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/,
        message: '"email": Debe contener al menos 2 o un máximo de 50, no acepta carateres especiales o números.',
    }),
    validate({
        validator: 'isLength',
        arguments: [2, 50],
        message: '"email": Solo puede contener entre {ARGS[0]} y {ARGS[1]} caracteres.',
    }),
]

const passwordValidator = [
    validate({
        validator: 'matches',
        arguments: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/,
        message:
            '"password": La contraseña necesita tener al menos un caracter en minúscula, uno en mayúscula, un número, un caracter especial, y debe tener al menos 8 caracteres. Ej. C0trasena*',
    }),
    validate({
        validator: 'isLength',
        arguments: [8, 35],
        message: '"password": Solo puede contener entre {ARGS[0]} y {ARGS[1]} caracteres.',
    }),
]

const userSchema = new Schema({
    name: {
        first: {
            type: String,
            required: [true, 'El nombre es requerido'],
            validate: firstnameValidator,
        },
        last: {
            type: String,
            required: [true, 'El apellido es requerido'],
            validate: lastnameValidator,
        },
    },
    email: {
        lowercase: true,
        maxlength: 50,
        required: [true, 'El email es requerido'],
        type: String,
        unique: true,
        validate: emailValidator,
    },
    avatar: String,
    username: {
        lowercase: true,
        maxlength: 30,
        minlength: 8,
        required: [true, 'El nombre de usuario \'{PATH}\' es requerido'],
        unique: true,
        type: String,
    },
    password: {
        required: [true, 'La contrasñea es requerido'],
        select: false,
        type: String,
        validate: passwordValidator,
    },
    signupDate: {
        type: Date,
        default: Date.now,
    },
    lastLogin: Date,
})

userSchema.plugin(titlize, {
    paths: ['name.first', 'name.last'],
})

export const User = model('User', userSchema)
