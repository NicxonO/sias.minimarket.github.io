const db_conection = require('../../database')

const providerController = {

    getProviders: (req, res) => {

        const query = 'SELECT * FROM tbl_proveedor'

        db_conection.query(query, (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'Error': 'Error en el servidor' })
            } else {
                res.status(200).json(rows)
            }
        })

    },

    getProvider: (req, res) => {

        const { Documento } = req.params

        const query = 'SELECT * FROM tbl_proveedor WHERE tbl_prov_id = ?'

        db_conection.query(query, [Documento], (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'Error': 'Error en el servidor' })
            } else {
                console.log(rows);
                if (rows.length > 0) {
                    res.status(200).json(rows)
                } else {
                    res.status(400).json({ "No encontrado": "El Proveedor no existe" })
                }

            }
        })
    },

    createProvider: (req, res) => {

        const { id, nombreProvedor, telefono} = req.body

        const query = 'INSERT INTO tbl_proveedor VALUES (?,?,?)'

        db_conection.query(query, [id, nombreProvedor, telefono], (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'Error': 'Error en el servidor' })
            } else {
                res.status(201).json({ 'Exito': 'Proveedor Creado' })
            }
        })

    },

    updateProvider: (req, res) => {

        const { id, nombreProveedor, contacto} = req.body

        const query = 'UPDATE tbl_proveedor SET tbl_prov_nombre = ?, tbl_prov_contacto = ? WHERE tbl_prov_id = ?'

        db_conection.query(query, [nombreProveedor, contacto, id], (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'Error': 'Error en el servidor' })
            } else {
                res.status(201).json({ 'Exito': 'Proveedor Actualizado' })
            }
        })

    },

    deleteProvider: (req, res) => {

        const { id } = req.body

        const query = 'DELETE FROM tbl_proveedor where tbl_prov_id = ?'

        db_conection.query(query, [id], (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'Error': 'Error en el servidor' })
            } else {
                res.status(201).json({ 'Exito': 'Proveedor Eliminado' })
            }
        })

    },
    renderProviders: (req,res) => {
        res.render('providers.ejs')
    }

}

exports.default = providerController