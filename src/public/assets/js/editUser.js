const idUser = document.querySelector('#idUser').innerText;
const inputNombre = document.querySelector('#inputNombre');
const inputEmail = document.querySelector('#inputEmail');
const inputPassword = document.querySelector('#inputPassword');
const inputRole = document.querySelector('#inputRole');

var token = localStorage.getItem('token');
const buttonSave = document.querySelector('#buttonSave');
const buttonCancel = document.querySelector('#buttonCancel');

function deshabilitarFormularioEditar(){
    inputNombre.disabled = true;
    inputEmail.disabled = true;
    inputPassword.disabled = true;
    inputRole.disabled = true;
    buttonSave.disabled = true;
    buttonCancel.disabled = true;
}

async function obtenerUsuario(id) {
    var myHeaders = new Headers();
    myHeaders.append("token", token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    await fetch(urlApiServer + "/api/usuario/"+id, requestOptions)
    .then(response => response.text())
    .then(result => {
        var data = JSON.parse(result);
        var usuario = data.usuario;
        inputNombre.value=usuario.nombre;
        inputEmail.value=usuario.email;
        inputPassword.value= usuario.password;
        inputRole.value=usuario.role;

        inputEmail.disabled = true;
        inputPassword.disabled = true;
    })
    .catch(error => console.error('error', error));

}

async function actualizarUsuario(id, nombre, role) {
    var myHeaders = new Headers();
    myHeaders.append("token", token);

    var urlencoded = new URLSearchParams();
    urlencoded.append("nombre", nombre);
    urlencoded.append("role", role);

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    let status;
    await fetch(urlApiServer + "/api/usuario/"+id, requestOptions)
        .then(response => {
        status = response.status;
        return response.text();
      })
        .then(result => {
            var data = JSON.parse(result);
            if(status === 200){
                deshabilitarFormularioEditar();
                swal("Usuario actualizado correctamente!", "Presione OK para continuar", "success")
                .then((value) => {
                    window.location='users';
                });
            } else {
                if(status === 401){
                    swal("Error", data.err.message, "error")
                    .then((value) => {
                        localStorage.setItem('token', '');
                        localStorage.setItem('usuario', '');
                        window.location='/';
                    });
                } else 
                    swal("Error al actualizar usuario!", data.err.message, "error");
            } 
        })
        .catch(error => {
            swal("Error", error, "error");
            console.error('error', error)
        });

}

buttonSave.addEventListener("click", async (e) => {
    e.preventDefault();
    await actualizarUsuario(idUser,inputNombre.value, inputRole.value);
});

$(document).ready( async function() {
    obtenerUsuario(idUser);
});
