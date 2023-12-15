const providersController = require('../controllers/categories').default
const express = require('express')


class RouteCategories {

    constructor() {
        this.ruta = express.Router()
        this.config()
    }

    config() {
        this.ruta.get('/categorias', providersController.renderCategories);
        this.ruta.get('/consultar-categorias', providersController.getCategories);
        this.ruta.post('/crear-categoria', providersController.createCategory);
        this.ruta.get('/consultar-categoria/:Documento', providersController.getCategory);
        this.ruta.put('/editar-categoria', providersController.updateCategory)
        this.ruta.delete('/eliminar-categoria', providersController.deleteCategory)
    }

}

exports.default = RouteCategories