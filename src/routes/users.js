const usersController = require('../controllers/users').default
const express = require('express')

class RouteUsuario {

    constructor() {
        this.ruta = express.Router()
        this.config()
    }

    config() {
        this.ruta.get('/usuarios', usersController.renderUsers)
        this.ruta.get('/consultar', usersController.getUsuarios)
        this.ruta.get('/consultarusuario/:Documento', usersController.getUsuariosC)
        this.ruta.post('/crear', usersController.createUsuarios)
        this.ruta.put('/editar', usersController.updateUsuarios)
        this.ruta.delete('/eliminar', usersController.deleteUsuarios)
    }

}

exports.default = RouteUsuario