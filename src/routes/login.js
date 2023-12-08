const express = require('express');

const router = express.Router();

var db_conection = require('../../database');

const configureSession = require('../../session');

configureSession(router);

router.get("/login", function(req, res){
    res.render("login.ejs")
})

router.post("/login", )

router.get('/logout', function(request, response, next){

    request.session.destroy();

    response.redirect("/login");

});

module.exports = router;