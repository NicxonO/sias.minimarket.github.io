const database = require('../../database')

const usuarioController = {

    getUsuarios: (req, res) => {

        const query = 'SELECT * FROM tbl_usuario LEFT JOIN tbl_rol_organizacion on tbl_usuario.tbl_usu_rol = tbl_rol_organizacion.tbl_rol_id'

        database.query(query, (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'Error': 'Error en el servidor' })
            } else {
                res.status(200).json(rows)
            }
        })

    },

    getUsuariosC: (req, res) => {

        const { Documento } = req.params

        console.log(Documento)

        const query = 'SELECT * FROM tbl_usuario LEFT JOIN tbl_rol_organizacion on tbl_usuario.tbl_usu_rol = tbl_rol_organizacion.tbl_rol_id WHERE tbl_usu_id = ?'

        database.query(query, [Documento], (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'Error': 'Error en el servidor' })
            } else {
                console.log(rows);
                if (rows.length > 0) {
                    res.status(200).json(rows)
                } else {
                    res.status(400).json({ "No encontrado": "El usuario no existe" })
                }

            }
        })
    },

    login: (req, res) => {

        const { usuario, pasword } = req.body

        const query = 'SELECT COUNT(*) sum FROM acceso WHERE usuario = ? and contrasenna = ?'

        database.query(query, [usuario, pasword], (err, rows) => {

            if (err) {
                console.log(err);
            } else {

                console.log(JSON.stringify(rows));

                const count = JSON.parse(JSON.stringify(rows))[0]['sum']

                if (count == 0) {
                    res.status(400).json({ 'Error': 'No existe' })
                } else {
                    res.status(200).json({ 'Exito': 'Existe' })
                }


            }

        })

    },

    createUsuarios: (req, res) => {

        const { id, nombre, nombreUsuario, email, password, rol } = req.body

        const query = 'INSERT INTO tbl_usuario VALUES (?,?,?,?,?,?)'

        database.query(query, [id, nombre, nombreUsuario, email, password, rol], (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'Error': 'Error en el servidor' })
            } else {
                res.status(201).json({ 'Exito': 'Usuario Creado' })
            }
        })

    },

    updateUsuarios: (req, res) => {

        const { id, nombre, nombreUsuario, email, password, rol } = req.body

        const query = 'UPDATE tbl_usuario SET tbl_usu_nombre = ?, tbl_usu_nombre_usuario = ?, tbl_usu_correo = ?, tbl_usu_contrasena = ?, tbl_usu_rol = ? WHERE tbl_usu_id = ?'

        database.query(query, [nombre, nombreUsuario, email, password, rol, id], (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'Error': 'Error en el servidor' })
            } else {
                res.status(201).json({ 'Exito': 'Usuario Actualizado' })
            }
        })

    },

    deleteUsuarios: (req, res) => {

        const { id } = req.body

        const query = 'DELETE FROM tbl_usuario where tbl_usu_id = ?'

        database.query(query, [id], (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'Error': 'Error en el servidor' })
            } else {
                res.status(201).json({ 'Exito': 'Usuario Eliminado' })
            }
        })

    }

}

exports.default = usuarioController