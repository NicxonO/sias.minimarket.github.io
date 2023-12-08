const database = require('../../database')

const loginController = {

    validateUser: function(req, res){
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
    }

}

exports.default = loginController