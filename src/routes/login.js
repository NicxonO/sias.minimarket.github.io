const express = require('express');

const router = express.Router();

var db_conection = require('../../database');

const configureSession = require('../../session');

configureSession(router);

router.get("/login", function(req, res){
    res.render("login.ejs")
})

router.post("/login", function(req, res){
    const data = req.body;
    let email = data.email;
    let password = data.password;

    if(email && password)
    {
        query = `SELECT * FROM tbl_usuario WHERE tbl_usu_correo = '${email}'`;

        db_conection.query(query, function(error, data){

            if(data.length > 0)
            {
                for(var count = 0; count < data.length; count++)
                {
                    if(data[count].tbl_usu_contrasena == password)
                    {
                        req.session.user_id = data[count].tbl_usu_id;
                        console.log(req.session)
                        res.redirect("/dashboard");
                    }
                    else
                    {
                        res.send('Contraseña incorrecta');
                    }
                }
            }
            else
            {
                res.send('El email no existe en el sistema');
            }
            res.end();
        });
    }
    else
    {
        res.send('Ingresa nuevamente el email y la contraseña');
        res.end();
    }
})

router.get('/logout', function(request, response, next){

    request.session.destroy();

    response.redirect("/login");

});

module.exports = router;