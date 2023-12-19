const db_conection = require('../../database')

const productsController = {

    getProducts: (req, res) => {

        const query = 'SELECT * FROM tbl_producto as tp LEFT JOIN tbl_producto_categoria AS tpc ON tp.tbl_prod_categoria = tpc.tbl_producto_categoria_id LEFT JOIN tbl_proveedor AS tpr on tp.tbl_prod_proveedor = tpr.tbl_prov_id'

        db_conection.query(query, (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'Error': 'Error en el servidor' })
            } else {
                res.status(200).json(rows)
            }
        })

    },

    getProduct: (req, res) => {

        const { Documento } = req.params

        const query = 'SELECT * FROM tbl_producto as tp LEFT JOIN tbl_producto_categoria AS tpc ON tp.tbl_prod_categoria = tpc.tbl_producto_categoria_id LEFT JOIN tbl_proveedor AS tpr on tp.tbl_prod_proveedor = tpr.tbl_prov_id WHERE tbl_prod_id = ?'

        db_conection.query(query, [Documento], (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'Error': 'Error en el servidor' })
            } else {
                console.log(rows);
                if (rows.length > 0) {
                    res.status(200).json(rows)
                } else {
                    res.status(400).json({ "No encontrado": "El Producto no existe" })
                }

            }
        })
    },

    createProduct: (req, res) => {

        const { id, nombreProducto, categoria, precioVenta, precioCompra, unidades, proveedor, activeUser, imgRoute} = req.body
        let imgDefaultRoute = '/placeholder.jpg';
        if (imgRoute){
            const query = 'INSERT INTO tbl_producto VALUES (?,?,?,?,?,?,?,?,?)'

            db_conection.query(query, [id, nombreProducto, unidades, precioCompra, precioVenta, imgRoute, categoria, proveedor, activeUser], (err, rows) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ 'Error': 'Error en el servidor' })
                } else {
                    res.status(201).json({ 'Exito': 'Producto Creado' })
                }
            })
        } else {
            const query = 'INSERT INTO tbl_producto VALUES (?,?,?,?,?,?,?,?,?)'

            db_conection.query(query, [id, nombreProducto, unidades, precioCompra, precioVenta, imgDefaultRoute, categoria, proveedor, activeUser], (err, rows) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ 'Error': 'Error en el servidor' })
                } else {
                    res.status(201).json({ 'Exito': 'Producto Creado' })
                }
            })
        }
    },

    updateProducto: (req, res) => {

        const { id, nombreProducto, categoria, precioCompra, precioVenta, existencias, proveedor, activeUser} = req.body

        const query = 'UPDATE tbl_producto SET tbl_prod_nombre = ?, tbl_prod_existencias = ?, tbl_prod_precio_compra = ?, tbl_prod_precio = ?, tbl_prod_categoria = ?, tbl_prod_proveedor = ?, tbl_prod_usuario = ? WHERE tbl_prod_id = ?'

        db_conection.query(query, [nombreProducto, existencias, precioCompra, precioVenta, categoria, proveedor, activeUser, id], (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'Error': 'Error en el servidor' })
            } else {
                res.status(201).json({ 'Exito': 'Producto Actualizado' })
            }
        })

    },

    deleteProduct: (req, res) => {

        const { id } = req.body

        const query = 'DELETE FROM tbl_producto where tbl_prod_id = ?'

        db_conection.query(query, [id], (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'Error': 'Error en el servidor' })
            } else {
                res.status(201).json({ 'Exito': 'Producto Eliminado' })
            }
        })

    },
    renderProducts: (req,res) => {
        res.render('products.ejs')
    }

}

exports.default = productsController