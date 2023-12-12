const providersController = require('../controllers/providers').default
const express = require('express')


class RouteProviders {

    constructor() {
        this.ruta = express.Router()
        this.config()
    }

    config() {
        this.ruta.get('/proveedores', providersController.renderProviders);
        this.ruta.get('/consultar-proveedores', providersController.getProviders);
        this.ruta.post('/crear-proveedor', providersController.createProvider);
        this.ruta.get('/consultar-proveedor/:Documento', providersController.getProvider);
        this.ruta.put('/editar-proveedor', providersController.updateProvider)
        this.ruta.delete('/eliminar-proveedor', providersController.deleteProvider)
    }

}

exports.default = RouteProviders