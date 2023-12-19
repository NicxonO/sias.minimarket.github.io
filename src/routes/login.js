const loginController = require('../controllers/login').default
const configureSession = require('../../session');
const express = require('express')


class RouteLogin {

    constructor() {
        this.ruta = express.Router()
        configureSession(this.ruta);
        this.config()
    }

    config() {
        this.ruta.get('/login', loginController.renderLogin)
        this.ruta.post('/login', loginController.validateUser)
        this.ruta.get('/logout',loginController.logout)
    }

}

exports.default = RouteLogin