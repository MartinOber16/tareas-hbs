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
            alert("Usuario registrado correctamente!");
            window.location='users';
            
        } else {
            if(status === 401){
                localStorage.setItem('token', '');
                localStorage.setItem('user', '');
                window.location='/login';
            } else {
                deshabilitarFormularioRegistro(false);
                swal("Error", data.error.message, "error");
                console.error(data.error);
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
