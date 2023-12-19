var lastId;
let url = "http://localhost:3000/";
var idActual;
var categorias;
var proveedores;
let activeUser;
function obtenerUsuarioActivo() {
    fetch(url + "usuario-activo", {
        method: "GET",
    })
        .then((response) => response.json())
        .then(data => { activeUser = data.activeUserId;})
        .catch((error) => console.log(error));
}
obtenerUsuarioActivo();
function obtenerCategorias() {
    fetch(url + "consultar-categorias", {
        method: "GET",
    })
        .then((response) => response.json())
        .then(data => { categorias = data;})
        .catch((error) => console.log(error));
}
obtenerCategorias();

function obtenerProveedores() {
    fetch(url + "consultar-proveedores", {
        method: "GET",
    })
        .then((response) => response.json())
        .then(data => { proveedores = data;})
        .catch((error) => console.log(error));
}
obtenerProveedores();

function listarProductos() {
    fetch(url + "consultar-productos", {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => mostrarData(data))
        .catch((error) => console.log(error));
    
    const mostrarData = (data) => {
        console.log(data);
        let i;
        let body = "";
        for (i = 0; i < data.length; i++) {
            body += `<tr>
                <td>${data[i].tbl_prod_id}</td>
                <td>${data[i].tbl_prod_nombre}</td>
                <td>${data[i].tbl_producto_categoria_nombre}</td>
                <td>${data[i].tbl_prod_precio_compra}</td>
                <td>${data[i].tbl_prod_precio}</td>
                <td>${data[i].tbl_prod_existencias}</td>
                <td>${data[i].tbl_prov_nombre}</td>
                <td><button class="btn btn-primary btn-sm mx-1" onclick="mostrarInfoProducto(${data[i].tbl_prod_id})" id="${data[i].tbl_prod_id}">Editar</button></td>
                </tr>`;
            lastId = data[i].tbl_prod_id;
        }
        document.getElementById("data").innerHTML = body;
    };
}
listarProductos();
function obtenerCategoriaNombre(idCategoria) {
    for (e = 0; e < categorias.length; e++){
        if (idCategoria == categorias[e].tbl_producto_categoria_id){
            return categorias[e].tbl_producto_categoria_nombre;
        } 
    }
}
function obtenerCategoriaId(nombreCategoria) {
    for (e = 0; e < categorias.length; e++){
        if (nombreCategoria == categorias[e].tbl_producto_categoria_nombre){
            return categorias[e].tbl_producto_categoria_id;
        } 
    }
}
function obtenerPoveedorNombre(idProveedor) {
    for (e = 0; e < proveedores.length; e++){
        if (idProveedor == proveedores[e].tbl_prov_nombre){
            return proveedores[e].tbl_prov_id;
        } 
    }
}
function obtenerPoveedorId(nombreProveedor) {
    for (e = 0; e < proveedores.length; e++){
        if (nombreProveedor == proveedores[e].tbl_prov_nombre){
            return proveedores[e].tbl_prov_id;
        } 
    }
}
function registrarProducto() {
    var nombre = document.getElementById("nombre").value;
    var categoria = document.getElementById("categoria").value;
    var precioCompra = document.getElementById("precio-compra").value;
    var precioVenta = document.getElementById("precio-venta").value;
    var unidades = document.getElementById("unidades").value;
    var proveedor = document.getElementById("proveedor").value;
    if (
        nombre == "" ||
        categoria == "" ||
        precioVenta == "" ||
        precioCompra == "" ||
        unidades == ""
    ) {
        alert(
            "Hay campos sin información en el formulario de registro, por favor completarlos previo a guardar."
        );
    } else {
        //Envia datos creados
        const create = () => {
            const data = {
                id: lastId + 1,
                nombreProducto: nombre,
                categoria: obtenerCategoriaId(categoria),
                precioVenta,
                precioCompra,
                unidades,
                proveedor: obtenerPoveedorId(proveedor),
                activeUser
            };

            fetch(url + "crear-producto", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                    if (res.status == 500) {
                        alert("error interno - Producto no creado");
                    } else {
                        alert("Producto Creado");
                        listarProductos();
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        create();
        limpiarFormulario();
        $("#modal-productos").modal("hide");
    }
}
function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("precio-compra").value = "";
    document.getElementById("precio-venta").value = "";
    document.getElementById("unidades").value = "";
    document.getElementById("proveedor").value = "";    
}
function mostrarInfoProducto(productoId) {
    fetch(url + "consultar-producto/" + productoId, {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("update-id").value = data[0].tbl_prod_id;
            document.getElementById("update-name").value = data[0].tbl_prod_nombre;
            document.getElementById("update-category").value = data[0].tbl_producto_categoria_nombre;
            document.getElementById("update-product-oprice").value = data[0].tbl_prod_precio_compra;
            document.getElementById("update-product-price").value = data[0].tbl_prod_precio;
            document.getElementById("update-stock").value = data[0].tbl_prod_existencias;
            document.getElementById("update-proveedor").value = data[0].tbl_prov_nombre;
            idActual = data[0].tbl_prod_id;
            $("#modal-productos").modal("show");
        })
        .catch((error) => console.log(error));
}

function actualizarInformacionProducto() {
    var nombreActualizado = document.getElementById("update-name").value;
    var categoria = document.getElementById("update-category").value;
    var precioCompra = document.getElementById("update-product-oprice").value;
    var precioVenta = document.getElementById("update-product-price").value;
    var existencias = document.getElementById("update-stock").value;
    var proveedor = document.getElementById("update-proveedor").value;

    const actualizar = () => {
        const data = {
            id: idActual,
            nombreProducto: nombreActualizado,
            categoria: obtenerCategoriaId(categoria) ,
            precioCompra,
            precioVenta,
            existencias,
            proveedor: obtenerPoveedorId(proveedor),
            activeUser
        };
        console.log(data);

        fetch(url + "editar-producto", {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.status == 500) {
                    alert("error interno - Producto no actualizado");
                } else {
                    alert("Producto Actualizado");
                    listarProductos();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    actualizar();
    limpiarFormulario();
}
function eliminarProducto() {
    const data = {
        id: idActual,
    };
    fetch(url + "eliminar-producto", {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            if (res.status == 500) {
                alert("error interno - Producto no eliminado");
            } else {
                alert("Producto eliminado");
                listarProductos();
                $("#modal-productos").modal("hide");
            }
        })
        .catch((err) => {
            console.log(err);
        });
}
