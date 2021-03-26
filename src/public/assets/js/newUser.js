const inputNombre = document.querySelector('#inputNombre');
const inputEmail = document.querySelector('#inputEmail');
const inputPassword = document.querySelector('#inputPassword');
const inputRole = document.querySelector('#inputRole');

var token = localStorage.getItem('token');
const buttonSave = document.querySelector('#buttonSave');
const buttonCancel = document.querySelector('#buttonCancel');

function deshabilitarFormulario(){
    inputNombre.disabled = true;
    inputEmail.disabled = true;
    inputPassword.disabled = true;
    inputRole.disabled = true;
    buttonSave.disabled = true;
    buttonCancel.disabled = true;
}
    
async function crearUsuario(nombre, email, password, role) {
    var myHeaders = new Headers();
    myHeaders.append("token", token);

    var urlencoded = new URLSearchParams();
    urlencoded.append("nombre", nombre);
    urlencoded.append("email", email);
    urlencoded.append("password", password);
    urlencoded.append("role", role);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    let status;
    await fetch(urlApiServer + "/api/usuario", requestOptions)
        .then(response => {
            status = response.status;
            return response.text();
          })
        .then(result => {
            var data = JSON.parse(result);
            if(status === 200){
                deshabilitarFormulario();
                swal("Usuario creado correctamente!", "Presione OK para continuar", "success")
                .then((value) => {
                    window.location='users';
                });
            }  else {
                if(status === 401){
                    swal("Error", data.err.message, "error")
                    .then((value) => {
                        localStorage.setItem('token', '');
                        localStorage.setItem('usuario', '');
                        window.location='/';
                    });
                } else 
                    swal("Error al crear usuario!", data.err.message, "error");
            }
            
        })
        .catch(error => {
            swal("Error", error, "error");
            console.error('error', error)
        });

}

buttonSave.addEventListener("click", async (e) => {
    e.preventDefault();
    await crearUsuario(inputNombre.value, inputEmail.value, inputPassword.value, inputRole.value);
});
