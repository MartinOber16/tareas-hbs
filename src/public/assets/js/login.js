const inputEmail = document.querySelector('#inputEmail');
const inputPassword = document.querySelector('#inputPassword');
var attempt = 3; // Variable to count number of attempts.
var token = '';

async function loginUser(email, password) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("password", password);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    let status;
    await fetch(urlApiServer + "/api/login", requestOptions)
      .then(response => {
        status = response.status;
        return response.text();
      })
      .then(result => {
        var data = JSON.parse(result);
        if(status === 200){
          token = data.token;
          if(token != undefined && token != ''){
            //create_cookie('token', token, 2, "/");
            //create_cookie('usuario', JSON.stringify(data.usuario), 2, "/");
            localStorage.setItem('token', token);
            localStorage.setItem('usuario', JSON.stringify(data.usuario)); // FIXME: arreglar esto 
            
            window.location = "tareas";
          }
            
        } else {
          swal("Error", data.err.message, "error");
          accesoIncorrecto();
        }

      })
      .catch(error => {
        swal("Error", error, "error");
        console.error('error', error)
      });
      
}

function accesoIncorrecto() {
  attempt --;// Decrementing by one.
  console.log('Intentos restante: ' + attempt);
  // Disabling fields after 3 attempts.
  if( attempt == 0){
    inputEmail.disabled = true;
    inputPassword.disabled = true;
    loginButton.disabled = true;
    return false;
  }
}

const loginButton = document.querySelector('#buttonSubmit');
loginButton.addEventListener("click", async (e) => {
    e.preventDefault();
    await loginUser(inputEmail.value, inputPassword.value);
});

if(validarUsuario()) {
  console.log('El usuario ya esta logueado!');
  window.location='tareas';
}