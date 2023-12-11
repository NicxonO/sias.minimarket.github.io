const providersController = require('../controllers/providers').default
const express = require('express')


class RouteProviders {

    constructor() {
        this.ruta = express.Router()
        this.config()
    }

    config() {
        this.ruta.get('/proveedores', providersController.renderProviders)
    }

}

exports.default = RouteProviders