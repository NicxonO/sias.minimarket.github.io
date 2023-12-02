//import  express  from "express";
//import mysql from "mysql";
const express = require('express');
const path = require('path');

const expressApp = express();
expressApp.set("view engine", "ejs");
expressApp.set('views', __dirname + '/src/views');
expressApp.use(express.json());
expressApp.use(express.urlencoded({extended:false}));
expressApp.use(express.static(__dirname + '/src/uploads'));
expressApp.use(express.static(__dirname + '/src/js'));

const configureSession = require('./session');

//Routes
const loginRoutes = require('./src/routes/login');
const dashboardRoutes = require('./src/routes/dashboard');
const usersRoutes = require('./src/routes/users').default;



configureSession(expressApp);

expressApp.use(loginRoutes);

const requireAuth = (req, res, next) => {
    if (req.session && req.session.user_id) {
        next(); // Usuario autenticado, continuar con el siguiente middleware
    } else {
        res.redirect('/login'); 
    }
};

expressApp.use(dashboardRoutes);
expressApp.use(new usersRoutes().ruta);




expressApp.get("/products", function(req, res){
    res.send('<h1>lista de productos</h1>')
})
expressApp.post("/products", function(req, res){
    res.send('<h1>Productos creados</h1>')
})
expressApp.put("/products", function(req, res){
    res.send('<h1>Actualizando productos</h1>')
})
expressApp.delete("/products", function(req, res){
    res.send('<h1>Eliminando productos</h1>')
})
expressApp.patch("/products", function(req, res){
    res.send('<h1>Actualizando parcialmente productos</h1>')
})
expressApp.all("/about", function(req, res){
    res.send('<h1>Respuesta a todas las peticiones</h1>')
})


//middleware (es un validador intermedio entre funciones, que se va a encargar de ejecutar logica antes de permitir ejecutar las siguientes lineas)

/* expressApp.use((req,res) => {
    if (req.query.login === 'nicxon.andres@hotmail.com'){
        next();
    } else {
        res.send('No autorizado')
    }
}) */

/* expressApp.use((req, res) => {
    res.status(404).send(`<h1>Está página no existe</h1>
    <a href="/" target="_blank" rel="noopener noreferrer">Voler al inicio de sesión</a>
    <a href="/dashboard" target="_blank" rel="noopener noreferrer">Voler al dashboard</a>`);
}) */

expressApp.listen(3000, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", "http://localhost:3000/login");
})