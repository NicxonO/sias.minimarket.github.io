var lastId;
let url = "http://localhost:3000/";
var idActual;
function listarCategorias() {
    fetch(url + "consultar-categorias", {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => mostrarData(data))
        .catch((error) => console.log(error));

    const mostrarData = (data) => {
        let i;
        let body = "";
        for (i = 0; i < data.length; i++) {
            body += `<tr>
                <td>${data[i].tbl_producto_categoria_id}</td>
                <td>${data[i].tbl_producto_categoria_nombre}</td>
                <td><button class="btn btn-primary btn-sm mx-1" onclick="mostrarInfoCategoria(${data[i].tbl_producto_categoria_id})" id="${data[i].tbl_producto_categoria_id}">Editar</button></td>
                </tr>`;
            lastId = data[i].tbl_producto_categoria_id;
        }
        document.getElementById("data").innerHTML = body;
    };
}
listarCategorias();
function registrarCategoria() {
    var nombre = document.getElementById("nombre").value;
    if (
        nombre == ""
    ) {
        alert(
            "Hay campos sin información en el formulario de registro, por favor completarlos previo a guardar."
        );
    } else {
        //Envia datos creados
        const create = () => {
            const data = {
                id: lastId + 1,
                nombreCategoria: nombre,
            };

            fetch(url + "crear-categoria", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                    if (res.status == 500) {
                        alert("error interno - Proveedor no creado");
                    } else {
                        alert("Categoria Creado");
                        listarCategorias();
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        create();
        limpiarFormulario();
    }
}
function limpiarFormulario() {
    document.getElementById("nombre").value = "";
}
function mostrarInfoCategoria(userId) {
    fetch(url + "consultar-categoria/" + userId, {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("update-id").value = data[0].tbl_producto_categoria_id;
            document.getElementById("update-name").value = data[0].tbl_producto_categoria_nombre;
            idActual = data[0].tbl_producto_categoria_id;
            $("#modal-category").modal("show");
        })
        .catch((error) => console.log(error));
}

function actualizarInformacionCategoria() {
    var nombreActualizado = document.getElementById("update-name").value;
    const actualizar = () => {
        const data = {
            id: idActual,
            nombreCategoria: nombreActualizado,
        };

        fetch(url + "editar-categoria", {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.status == 500) {
                    alert("error interno - categoria no actualizada");
                } else {
                    alert("Categoria Actualizada");
                    listarCategorias();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    actualizar();
    limpiarFormulario();
}
function eliminarCategoria() {
    const data = {
        id: idActual,
    };
    fetch(url + "eliminar-categoria", {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            if (res.status == 500) {
                alert("error interno - Categoria no eliminada");
            } else {
                alert("Categoria eliminada");
                listarCategorias();
                $("#modal-category").modal("hide");
            }
        })
        .catch((err) => {
            console.log(err);
        });
}
