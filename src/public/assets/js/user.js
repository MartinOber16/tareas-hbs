const idUser = document.querySelector('#idUser').innerText;
const inputname = document.querySelector('#inputname');
const inputEmail = document.querySelector('#inputEmail');
const inputPassword = document.querySelector('#inputPassword');
const inputRole = document.querySelector('#inputRole');
const btnSave = document.querySelector('#btnSave');
const btnCancel = document.querySelector('#btnCancel');
const btnDelete = document.querySelector('#btnDelete');

const deshabilitarFormularioEditar = ( value ) => {
    inputname.disabled = value;
    inputEmail.disabled = value;
    inputPassword.disabled = value;
    inputRole.disabled = value;
    btnSave.disabled = value;
    btnCancel.disabled = value;
}

const obtenerUsuario = async (id) => {

    try {
        const url = `${urlApi}/user/${id}`;

        let myHeaders = new Headers();
        myHeaders.append("token", token);
    
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(url, requestOptions);
        const { status } = response;
        const data = await response.json();

        console.log(data)
        
        if(status === 200){
            const user = data.user;
            inputname.value=user.name;
            inputEmail.value=user.email;
            inputPassword.value= user.password;
            inputRole.value=user.role;
    
            deshabilitarFormularioEditar(false);
            inputEmail.disabled = true;
            inputPassword.disabled = true;

        }  else {
            if(status === 401){
                localStorage.setItem('token', '');
                localStorage.setItem('user', '');
                window.location='/';
            } else {
                deshabilitarFormularioEditar(false);
                swal("Error", data.error.message, "error");
                console.error(data.error);
            }
        }

    } catch (error) {
        swal("Error", error, "error");
        console.error(error)
    }

}

const actualizarUsuario = async (id, name, role) => {
    
    try {
        const url = `${urlApi}/user/${id}`;

        let myHeaders = new Headers();
        myHeaders.append("token", token);

        let urlencoded = new URLSearchParams();
        urlencoded.append("name", name);
        urlencoded.append("role", role);
    
        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        const response = await fetch(url, requestOptions);
        const { status } = response;
        const data = await response.json();

        if(status === 200){
            swal("Usuario actualizado correctamente!", "","success")
            .then( () => {
                window.location='users';
            });

        }  else {
            if(status === 401){
                localStorage.setItem('token', '');
                localStorage.setItem('user', '');
                window.location='/';
            } else {
                deshabilitarFormularioEditar(false);
                alert(data.error);
                console.error(data)
            }
        }

    } catch (error) {
        swal("Error", error, "error");
        console.error(error)
    }

}

const eliminarUsuario = async (id) => {

    try {
        const url = `${urlApi}/user/${id}`;

        let myHeaders = new Headers();
        myHeaders.append("token", token);
    
        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(url, requestOptions);
        const { status } = response;
        const data = await response.json();
        
        if(status === 200){
            swal("Usuario eliminado correctamente!", "","success")
            .then( () => {
                window.location='users';
            });

        }  else {
            if(status === 401){
                localStorage.setItem('token', '');
                localStorage.setItem('user', '');
                window.location='/';
            } else {
                deshabilitarFormularioEditar(false);
                alert(data.error);
                console.error(data)
            }
        }

    } catch (error) {
        swal("Error", error, "error");
        console.error(error)
    }
        
}


btnSave.addEventListener("click", async (e) => {
    e.preventDefault();
    await actualizarUsuario(idUser,inputname.value, inputRole.value);
});


btnDelete.addEventListener("click", async (e) => {
    e.preventDefault();

    swal({
        title: "¿Esta seguro que quiere eliminar este usuario?",
        text: "Una vez eliminado, no podrá recuperar este usuario",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then( async (willDelete) => {
        if (willDelete) {
            deshabilitarFormularioEditar(true);
            await eliminarUsuario(idUser);
        } 
      });
   
});

$(document).ready( async function() {
    deshabilitarFormularioEditar(true);
    await obtenerUsuario(idUser);

});
