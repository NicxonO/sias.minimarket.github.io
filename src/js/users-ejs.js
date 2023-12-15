var lastId;
let url = "http://localhost:3000/";
var idActual;
function listarUsuarios() {
    fetch(url + "consultar", {
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
                <td>${data[i].tbl_usu_id}</td>
                <td>${data[i].tbl_usu_nombre}</td>
                <td>${data[i].tbl_usu_nombre_usuario}</td>
                <td>${data[i].tbl_usu_correo}</td>
                <td>${data[i].tbl_usu_contrasena}</td>
                <td>${data[i].tbl_rol_nombre}</td>
                <td><button class="btn btn-primary btn-sm mx-1" onclick="mostrarInfoUsuario(${data[i].tbl_usu_id})" id="${data[i].tbl_usu_id}">Editar</button></td>
                </tr>`;
            lastId = data[i].tbl_usu_id;
        }
        document.getElementById("data").innerHTML = body;
    };
}
listarUsuarios();
function registrarUsuario() {
    var nombre = document.getElementById("nombre").value;
    var nombreUsuario = document.getElementById("nombre-usuario").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var rol = document.getElementById("role").value;
    if (
        nombre == "" ||
        nombreUsuario == "" ||
        email == "" ||
        password == "" ||
        rol == ""
    ) {
        alert(
            "Hay campos sin información en el formulario de registro, por favor completarlos previo a guardar."
        );
    } else {
        //Envia datos creados
        const create = () => {
            const data = {
                id: lastId + 1,
                nombre: nombre,
                nombreUsuario: nombreUsuario,
                email: email,
                password: password,
                rol: rol,
            };

            fetch(url + "crear", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                    if (res.status == 500) {
                        alert("error interno - Usuario no creado");
                    } else {
                        alert("Usuario Creado");
                        listarUsuarios();
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
    document.getElementById("nombre-usuario").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("role").value = "";
}
function mostrarInfoUsuario(userId) {
    fetch(url + "consultarusuario/" + userId, {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("update-id").value = data[0].tbl_usu_id;
            document.getElementById("update-name").value = data[0].tbl_usu_nombre;
            document.getElementById("update-username").value = data[0].tbl_usu_nombre_usuario;
            document.getElementById("update-email").value = data[0].tbl_usu_correo;
            document.getElementById("update-password").value = data[0].tbl_usu_contrasena;
            document.getElementById("update-rol").value = data[0].tbl_rol_nombre;
            idActual = data[0].tbl_usu_id;
            $("#modal-usuario").modal("show");
        })
        .catch((error) => console.log(error));
}

function actualizarInformacionUsuario() {
    var nombreActualizado = document.getElementById("update-name").value;
    var usernameActualizado = document.getElementById("update-username").value;
    var emailActualizado = document.getElementById("update-email").value;
    var passwordActualizado = document.getElementById("update-password").value;
    var rolActualizado = document.getElementById("update-rol").value;
    if (rolActualizado == "Administrador") {
        rolActualizado = 1;
    } else {
        rolActualizado = 2;
    }

    const actualizar = () => {
        const data = {
            id: idActual,
            nombre: nombreActualizado,
            nombreUsuario: usernameActualizado,
            email: emailActualizado,
            password: passwordActualizado,
            rol: rolActualizado,
        };

        fetch(url + "editar", {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.status == 500) {
                    alert("error interno - Usuario no actualizado");
                } else {
                    alert("Usuario Actualizado");
                    listarUsuarios();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    actualizar();
    limpiarFormulario();
}
function eliminarUsuario() {
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
                alert("error interno - Usuario no eliminado");
            } else {
                alert("Usuario eliminado");
                listarUsuarios();
                $("#modal-usuario").modal("hide");
            }
        })
        .catch((err) => {
            console.log(err);
        });
}
