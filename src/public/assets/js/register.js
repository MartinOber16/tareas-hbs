const urlApi = 'https://mo-tasks-server.herokuapp.com/api';

const inputNombreRegistro = document.querySelector('#inputNombreRegistro');
const inputEmailRegistro = document.querySelector('#inputEmailRegistro');
const inputPasswordRegistro = document.querySelector('#inputPasswordRegistro');
const inputPasswordRegistro2 = document.querySelector('#inputPasswordRegistro2');
const logOnButton = document.querySelector('#buttonSubmitRegistro');
const cancelLogOnButton = document.querySelector('#buttonCancelRegistro');

const deshabilitarFormularioRegistro = (value) => {
  inputNombreRegistro.disabled = value;
  inputEmailRegistro.disabled = value;
  inputPasswordRegistro.disabled = value;
  inputPasswordRegistro2.disabled = value;
  logOnButton.disabled = value;
  cancelLogOnButton.disabled = value;
}

const registerUser = async (nombre, email, password) => {

    try {
        const url = `${urlApi}/user`;
    
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
        let urlencoded = new URLSearchParams();
        urlencoded.append("name", nombre);
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
            alert("Usuario registrado correctamente!");
            window.location='/';
            
        } else {
            deshabilitarFormularioRegistro(false);
            alert(error.error);
            console.error(data);
        }
  
      } catch (error) {
        alert(error);
        console.error(error);
      }
      
}

logOnButton.addEventListener("click", async (e) => {
    e.preventDefault();

    console.log(inputPasswordRegistro.value);
    console.log(inputPasswordRegistro2.value);

    if( inputPasswordRegistro.value === inputPasswordRegistro2.value) {
      deshabilitarFormularioRegistro(true);
      await registerUser(inputNombreRegistro.value, inputEmailRegistro.value, inputPasswordRegistro.value);

    } else {
      alert('Las contraseñas ingresadas no coiciden!');
    }
    

});

