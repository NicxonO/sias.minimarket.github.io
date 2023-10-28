const express = require("express");
const mysql = require("mysql");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/", function(req, res){
    res.render("registro.ejs")
})


app.listen(4401, function(){
    console.log("Servidor inicializado con éxito http://localhost:4011");
});
