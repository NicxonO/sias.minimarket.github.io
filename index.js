const express = require("express");
const mysql = require("mysql");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:false}));

let db_conection = mysql.createConnection({
    host: "localhost",
    database: "juanjosuper",
    user: "root",
    password: ""
})

app.post("/validar", function(req, res){
    console.log("Entré a validar");
    const data = req.body;
    console.log(data);
    let identification = data.identification;
    let name = data.name;
    let email = data.email;
    let password = data.password;
    let role = data.role;

    let register = `INSERT INTO tbl_usuario (tbl_usu_nombre,tbl_usu_correo,tbl_usu_contrasena,tbl_usu_cedula,tbl_usu_rol) VALUES ("${name}","${email}","${password}","${identification}","${role}")`;

    db_conection.query(register, function(error){
        if(error){
            throw error;
        }
        else{
            console.log("Datos almacenados con exito bajo el query "+register);
        }
    })

});

app.get("/", function(req, res){
    res.render("registro.ejs")
})

app.listen(3000, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", "http://localhost:3000");
})