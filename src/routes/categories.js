const categoriesController = require('../controllers/categories').default
const express = require('express')


class RouteCategories {

    constructor() {
        this.ruta = express.Router()
        this.config()
    }

    config() {
        this.ruta.get('/categorias', categoriesController.renderCategories);
        this.ruta.get('/consultar-categorias', categoriesController.getCategories);
        this.ruta.post('/crear-categoria', categoriesController.createCategory);
        this.ruta.get('/consultar-categoria/:Documento', categoriesController.getCategory);
        this.ruta.put('/editar-categoria', categoriesController.updateCategory)
        this.ruta.delete('/eliminar-categoria', categoriesController.deleteCategory)
    }

}

exports.default = RouteCategories