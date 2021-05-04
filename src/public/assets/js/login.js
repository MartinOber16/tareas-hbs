let token = localStorage.getItem('token') || '';
let user = localStorage.getItem('user') || '';

const inputEmail = document.querySelector('#inputEmail');
const inputPassword = document.querySelector('#inputPassword');
const btnLogin = document.querySelector('#btnSubmit');

let attempt = 3; // Variable to count number of attempts.

const deshabilitarFormulario = (value) => {
  inputEmail.disabled = value;
  inputPassword.disabled = value;
  btnLogin.disabled = value;
}

const loginUser = async ( email, password ) => {
    
    try {
      const url = `${urlApi}/auth/login`;
  
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
      let urlencoded = new URLSearchParams();
      urlencoded.append("email", email);
      urlencoded.append("password", password);
  
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };
  
      const response = await fetch(url, requestOptions);
      const { status } = response;
      const data = await response.json();

      if(status === 200){
        token = data.token;
        if(token != undefined && token != ''){
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(data.user));
          window.location = "tasks";
        }
          
      } else {
        deshabilitarFormulario(false);
        const error = data.error || data.errors[0];    
        swal("Error", error.msg, "error");
        console.error(data);
        accesoIncorrecto();
      }

    } catch ( error ) {
      swal("Error", error, "error");
      console.error( error );
    }
    
}

const accesoIncorrecto = () => {
  attempt --;// Decrementing by one.
  console.log('Intentos restante: ' + attempt);
  // Disabling fields after 3 attempts.
  if( attempt == 0){
    inputEmail.disabled = true;
    inputPassword.disabled = true;
    btnLogin.disabled = true;
    return false;
  }
}

const validarUsuario = async () => {
  if( token === null || token === '' || token === undefined ) {
      console.log('No se encontro token de autorización');
  } else {
      try {
          const url = `${urlApi}/auth/new-token`;
      
          let myHeaders = new Headers();
          myHeaders.append("token", token);
      
          const requestOptions = {
              method: 'POST',
              headers: myHeaders,
              redirect: 'follow'
          };
      
          const response = await fetch(url, requestOptions);
          const { status } = response;
          const data = await response.json();

          if(status === 200){
              token = data.token;
              if(token != undefined && token != ''){
              localStorage.setItem('token', token);
              localStorage.setItem('user', JSON.stringify(data.user));
              window.location = "tasks";
              }
              
          } else {
            const error = data.error || data.errors[0];    
            swal("Error", error.msg, "error");
            console.error(data);
            window.location = "/";
          }

      } catch (error) {
          swal("Error", error, "error");
          console.error(error);
      }

  }
}

btnLogin.addEventListener("click", async (e) => {
    e.preventDefault();
    deshabilitarFormulario(true);
    await loginUser( inputEmail.value, inputPassword.value );
});

validarUsuario();