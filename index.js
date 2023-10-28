const express = require("express");
const mysql = require("mysql");

const app = express();

const PORT = 3000;
 
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})

app.get("/", function(req, res){
    res.render("registro.ejs")
})
console.log("actualizado");