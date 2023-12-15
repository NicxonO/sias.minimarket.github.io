const db_conection = require('../../database')

const categoriesController = {

    getCategories: (req, res) => {

        const query = 'SELECT * FROM tbl_producto_categoria'

        db_conection.query(query, (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'Error': 'Error en el servidor' })
            } else {
                res.status(200).json(rows)
            }
        })

    },

    getCategory: (req, res) => {

        const { Documento } = req.params

        const query = 'SELECT * FROM tbl_producto_categoria WHERE tbl_producto_categoria_id = ?'

        db_conection.query(query, [Documento], (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'Error': 'Error en el servidor' })
            } else {
                console.log(rows);
                if (rows.length > 0) {
                    res.status(200).json(rows)
                } else {
                    res.status(400).json({ "No encontrado": "La categoria no existe" })
                }

            }
        })
    },

    createCategory: (req, res) => {

        const { id, nombreCategoria} = req.body

        const query = 'INSERT INTO tbl_producto_categoria VALUES (?,?)'

        db_conection.query(query, [id, nombreCategoria], (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'Error': 'Error en el servidor' })
            } else {
                res.status(201).json({ 'Exito': 'Categoria Creada' })
            }
        })

    },

    updateCategory: (req, res) => {

        const { id, nombreCategoria} = req.body

        const query = 'UPDATE tbl_producto_categoria SET tbl_producto_categoria_nombre = ? WHERE tbl_producto_categoria_id = ?'

        db_conection.query(query, [nombreCategoria, id], (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'Error': 'Error en el servidor' })
            } else {
                res.status(201).json({ 'Exito': 'Proveedor Actualizado' })
            }
        })

    },

    deleteCategory: (req, res) => {

        const { id } = req.body

        const query = 'DELETE FROM tbl_producto_categoria where tbl_producto_categoria_id = ?'

        db_conection.query(query, [id], (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'Error': 'Error en el servidor' })
            } else {
                res.status(201).json({ 'Exito': 'Proveedor Eliminado' })
            }
        })

    },
    renderCategories: (req,res) => {
        res.render('categories.ejs')
    }

}

exports.default = categoriesController