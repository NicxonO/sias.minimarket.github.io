const productsController = require('../controllers/products').default
const express = require('express')


class RouteProducts {

    constructor() {
        this.ruta = express.Router()
        this.config()
    }

    config() {
        this.ruta.get('/productos', productsController.renderProducts);
        this.ruta.get('/consultar-productos', productsController.getProducts);
        this.ruta.post('/crear-producto', productsController.createProduct);
        this.ruta.get('/consultar-producto/:Documento', productsController.getProduct);
        this.ruta.put('/editar-producto', productsController.updateProducto)
        this.ruta.delete('/eliminar-producto', productsController.deleteProduct)
    }

}

exports.default = RouteProducts