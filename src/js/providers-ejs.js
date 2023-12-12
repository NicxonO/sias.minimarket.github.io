var lastId;
let url = "http://localhost:3000/";
var idActual;
function listarProveedores() {
    fetch(url + "consultar-proveedores", {
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
                <td>${data[i].tbl_prov_id}</td>
                <td>${data[i].tbl_prov_nombre}</td>
                <td>${data[i].tbl_prov_contacto}</td>
                <td><button class="btn btn-primary btn-sm mx-1" onclick="mostrarInfoProveedor(${data[i].tbl_prov_id})" id="${data[i].tbl_prov_id}">Editar</button></td>
                </tr>`;
            lastId = data[i].tbl_usu_id;
        }
        document.getElementById("data").innerHTML = body;
    };
}
listarProveedores();
function registrarProveedor() {
    var nombre = document.getElementById("nombre").value;
    var telefono = document.getElementById("telefono").value;
    if (
        nombre == "" ||
        telefono == ""
    ) {
        alert(
            "Hay campos sin información en el formulario de registro, por favor completarlos previo a guardar."
        );
    } else {
        //Envia datos creados
        const create = () => {
            const data = {
                id: lastId + 1,
                nombreProvedor: nombre,
                telefono: telefono
            };

            fetch(url + "crear-proveedor", {
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
                        alert("Proveedor Creado");
                        listarProveedores();
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        create();
    }
}
function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("telefono").value = "";
}
function mostrarInfoProveedor(userId) {
    fetch(url + "consultar-proveedor/" + userId, {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("update-id").value = data[0].tbl_prov_id;
            document.getElementById("update-name").value = data[0].tbl_prov_nombre;
            document.getElementById("update-phone").value = data[0].tbl_prov_contacto;
            idActual = data[0].tbl_prov_id;
            $("#modal-usuario").modal("show");
        })
        .catch((error) => console.log(error));
}

function actualizarInformacionProveedor() {
    var nombreActualizado = document.getElementById("update-name").value;
    var contactoActualizado = document.getElementById("update-phone").value;
    const actualizar = () => {
        const data = {
            id: idActual,
            nombreProveedor: nombreActualizado,
            contacto: contactoActualizado,
        };

        fetch(url + "editar-proveedor", {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.status == 500) {
                    alert("error interno - proveedor no actualizado");
                } else {
                    alert("Proveedor Actualizado");
                    listarProveedores();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    actualizar();
}
function eliminarProveedor() {
    const data = {
        id: idActual,
    };
    fetch(url + "eliminar", {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            if (res.status == 500) {
                alert("error interno - Proveedor no eliminado");
            } else {
                alert("Proveedor eliminado");
                listarProveedores();
                $("#modal-proveedor").modal("hide");
            }
        })
        .catch((err) => {
            console.log(err);
        });
}
