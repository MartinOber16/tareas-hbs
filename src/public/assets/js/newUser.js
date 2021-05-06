const inputname = document.querySelector('#inputname');
const inputEmail = document.querySelector('#inputEmail');
const inputPassword = document.querySelector('#inputPassword');
const inputRole = document.querySelector('#inputRole');
const btnSave = document.querySelector('#btnSave');
const btnCancel = document.querySelector('#btnCancel');

const deshabilitarFormulario = ( value ) => {
    inputname.disabled = value;
    inputEmail.disabled = value;
    inputPassword.disabled = value;
    inputRole.disabled = value;
    btnSave.disabled = value;
    btnCancel.disabled = value;
}
    
const crearUsuario = async (name, email, password, role) => {

    try {
        const url = `${urlApi}/user`;
    
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
        let urlencoded = new URLSearchParams();
        urlencoded.append("name", name);
        urlencoded.append("email", email);
        urlencoded.append("password", password);
        urlencoded.append("role", role);
    
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
            await enviarEmail(userInfo.email, email, 'Bienvenido a Tareas App', `Hola ${name}, \n Su usuario es ${email} y su contraseña es: ${password}`);
            swal("Usuario registrado correctamente!", "","success")
            .then( () => {
                window.location='users';
            });
            
        } else {
            if(status === 401){
                localStorage.setItem('token', '');
                localStorage.setItem('user', '');
                window.location='login';
            } else {
                deshabilitarFormularioRegistro(false);
                const error = data.error || data.errors[0];    
                swal("Error", error.msg, "error");
                console.error(data);
            }
        }
    
        } catch (error) {
        swal("Error", error, "error");
        console.error(error);
        }
        
}

btnSave.addEventListener("click", async (e) => {
    e.preventDefault();
    deshabilitarFormulario(true);
    await crearUsuario( inputname.value, inputEmail.value, inputPassword.value, inputRole.value );
});
