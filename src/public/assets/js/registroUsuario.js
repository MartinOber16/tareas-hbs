const inputNombreRegistro = document.querySelector('#inputNombreRegistro');
const inputEmailRegistro = document.querySelector('#inputEmailRegistro');
const inputPasswordRegistro = document.querySelector('#inputPasswordRegistro');
const logOnButton = document.querySelector('#buttonSubmitRegistro');
const cancelLogOnButton = document.querySelector('#buttonCancelRegistro');

function deshabilitarFormularioRegistro(){
  inputNombreRegistro.disabled = true;
  inputEmailRegistro.disabled = true;
  inputPasswordRegistro.disabled = true;
  logOnButton.disabled = true;
  cancelLogOnButton.disabled = true;
}

async function logOnUser(nombre, email, password) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("nombre", nombre);
    urlencoded.append("email", email);
    urlencoded.append("password", password);
    //urlencoded.append("role", "USER_ROLE");

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
          deshabilitarFormularioRegistro();
          swal("Usuario registrado correctamente!", "Presione OK para continuar", "success")
          .then((value) => {
            window.location='tareas';
          });
        } else {
          swal("Error al registrar usuario!", data.err.message, "error");
        }

      })
      .catch(error => {
        swal("Error", error, "error");
        console.error('error', error)
      });
      
}

logOnButton.addEventListener("click", async (e) => {
    e.preventDefault();
    await logOnUser(inputNombreRegistro.value, inputEmailRegistro.value, inputPasswordRegistro.value);
});

if(validarUsuario()) {
  console.log('El usuario ya esta logueado!');
  window.location='tareas';
}
