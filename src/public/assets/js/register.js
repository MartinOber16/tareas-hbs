const inputnameRegistro = document.querySelector('#inputnameRegistro');
const inputEmailRegistro = document.querySelector('#inputEmailRegistro');
const inputPasswordRegistro = document.querySelector('#inputPasswordRegistro');
const inputPasswordRegistro2 = document.querySelector('#inputPasswordRegistro2');
const btnLogOn = document.querySelector('#btnSubmitRegistro');
const btnCancelLogOn = document.querySelector('#btnCancelRegistro');

const deshabilitarFormularioRegistro = (value) => {
  inputnameRegistro.disabled = value;
  inputEmailRegistro.disabled = value;
  inputPasswordRegistro.disabled = value;
  inputPasswordRegistro2.disabled = value;
  btnLogOn.disabled = value;
  btnCancelLogOn.disabled = value;
}

const registerUser = async (name, email, password) => {

    try {
        const url = `${urlApi}/user`;
    
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
        let urlencoded = new URLSearchParams();
        urlencoded.append("name", name);
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
          swal("Usuario eliminado correctamente!", "","success")
          .then( () => {
              window.location='login';
          });
            
        } else {
            deshabilitarFormularioRegistro(false);
            const error = data.error || data.errors[0];    
            swal("Error", error.msg, "error");
            console.error(data);
        }
  
      } catch (error) {
        swal("Error", error, "error");
        console.error(error);
      }
      
}

btnLogOn.addEventListener("click", async (e) => {
    e.preventDefault();

    if( inputPasswordRegistro.value === inputPasswordRegistro2.value) {
      deshabilitarFormularioRegistro(true);
      await registerUser(inputnameRegistro.value, inputEmailRegistro.value, inputPasswordRegistro.value);

    } else {
      alert('Las contraseñas ingresadas no coiciden!');
    }
    

});

