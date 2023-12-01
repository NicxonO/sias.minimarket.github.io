const usuarioController = require('../controllers/usuarios').default
const express = require('express')

class RouteUsuario {

    constructor() {
        this.ruta = express.Router()
        this.config()
    }

    config() {
        this.ruta.get('/usuarios', (req,res)=>{res.render('users.ejs')})
        this.ruta.get('/consultar', usuarioController.getUsuarios)
        this.ruta.get('/consultar2/:Documento', usuarioController.getUsuariosC)
        this.ruta.post('/crear', usuarioController.createUsuarios)
        this.ruta.post('/login', usuarioController.login)
        this.ruta.post('/loginnivel', usuarioController.loginnivel)
        this.ruta.put('/editar', usuarioController.updateUsuarios)
        this.ruta.delete('/borrar', usuarioController.deleteUsuarios)
    }

}

exports.default = RouteUsuario