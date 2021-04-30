const urlApi = 'https://mo-tasks-server.herokuapp.com/api';
const inputEmail = document.querySelector('#inputEmail');
const inputPassword = document.querySelector('#inputPassword');
let attempt = 3; // Variable to count number of attempts.
let token = '';

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
            window.location = "task";
          }
            
        } else {
          console.error(data)
          accesoIncorrecto();
        }

    } catch (error) {
        console.error(error)
    }
    
}

const accesoIncorrecto = () => {
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
    await loginUser( inputEmail.value, inputPassword.value );
});

// TODO: El usuario ya esta logueado, valido el token y lo renuevo