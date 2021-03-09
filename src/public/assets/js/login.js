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
            localStorage.setItem('usuario', JSON.stringify(data.usuario));
            
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

// El usuario ya esta logueado, valido el token y lo renuevo
const validarJWT = async () => {
    token = localStorage.getItem('token') || '';

    if(token !== undefined && token !== '' && token !== null) {

      var myHeaders = new Headers();
      myHeaders.append("token", token);
  
      var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
      };
  
      let status;
      await fetch(urlApiServer + "/api/token", requestOptions)
      .then(response => {
          status = response.status;
          return response.text();
        })
      .then(result => {
          var data = JSON.parse(result);
          if(status === 200){
            localStorage.setItem('token', data.token);
            localStorage.setItem('usuario', JSON.stringify(data.usuario));
            window.location='/tareas';
          } 
          else {
            console.log(data.err.message);
            localStorage.setItem('token', '');
            localStorage.setItem('usuario', '');
          }
      })
      .catch(error => {
          console.error('error', error)
          swal("Error", error, "error");
      });
  }

} 

validarJWT();