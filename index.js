//import  express  from "express";
//import mysql from "mysql";
const express = require('express');
const mysql = require('mysql');

const expressApp = express();
console.log(__dirname)
expressApp.set("view engine", "ejs");
expressApp.set('views', __dirname + '/src/views');
expressApp.use(express.json());
expressApp.use(express.urlencoded({extended:false}));

let db_conection = mysql.createConnection({
    host: "localhost",
    database: "juanjosuper",
    user: "root",
    password: ""
})

expressApp.post("/validar", function(req, res){
    console.log("Entré a validar");
    const data = req.body;
    console.log(data);
    let email = data.email;
    let password = data.password;
    let login = `SELECT * FROM tbl_usuario WHERE tbl_usu_correo = '${email}' and tbl_usu_contrasena = '${password}'`;
    //let register = `INSERT INTO tbl_usuario (tbl_usu_nombre,tbl_usu_correo,tbl_usu_contrasena,tbl_usu_cedula,tbl_usu_rol) VALUES ("${name}","${email}","${password}","${identification}","${role}")`;

    db_conection.query(login, function(error){
        if(error){
            throw error;
        }
        else{
            console.log("El usuario existe en el sistema "+ login);
            res.redirect("/dashboard");
        }
        res.end();
    })
    
});

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
expressApp.get("/", function(req, res){
    res.render("login.ejs")
})

//middleware (es un validador intermedio entre funciones, que se va a encargar de ejecutar logica antes de permitir ejecutar las siguientes lineas)

/* expressApp.use((req,res) => {
    if (req.query.login === 'nicxon.andres@hotmail.com'){
        next();
    } else {
        res.send('No autorizado')
    }
}) */


expressApp.get("/dashboard", function(req, res){
    res.render("dashboard.ejs")
})
expressApp.use((req, res) => {
    res.status(404).send(`<h1>Está página no existe</h1>
    <a href="/" target="_blank" rel="noopener noreferrer">Voler al inicio de sesión</a>
    <a href="/dashboard" target="_blank" rel="noopener noreferrer">Voler al dashboard</a>`);
})

expressApp.listen(3000, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", "http://localhost:3000");
})