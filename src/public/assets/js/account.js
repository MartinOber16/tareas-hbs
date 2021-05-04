const archivo = document.querySelector('#archivo');
const btnImagen = document.querySelector('#btnImagen');
const btnSubmitNewPassword =  document.querySelector('#btnSubmitNewPassword');


const deshabilitarCarga = (value) => {
    archivo.disabled = value;
    btnImagen.disabled = value;
}

const deshabilitarNuevaPassword = (value) => {
    document.querySelector('#inputPassword').disabled = value;
    document.querySelector('#inputNewPassword').disabled = value;
    document.querySelector('#inputNewPassword2').disabled = value;
}

const actualizarImagen = async (id, archivo) => {

    try {
        
        const url = `${urlApi}/image/user/${id}`;

        let myHeaders = new Headers();
        myHeaders.append("token", token);
    
        let formdata = new FormData();
        formdata.append("archivo", archivo.files[0], archivo.files[0].name);
        
        const requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };

        const response = await fetch(url, requestOptions);
        const { status } = response;
        const data = await response.json();

        if(status === 200){
           
            localStorage.setItem('user', JSON.stringify(data));

            swal("Imagen actualizada correctamente!","","success")
                .then( () => {
                    window.location='account';
            });

        } else {
            if(status === 401){
                localStorage.setItem('token', '');
                localStorage.setItem('user', '');
                window.location='/login';
            } else {
                deshabilitarCarga(false);
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

const changePassword = async ( password, newPassword ) => {

    try {

        const url = `${urlApi}/auth/change-password`;
        let myHeaders = new Headers();
        myHeaders.append("token", token);

        let formdata = new FormData();
        formdata.append("password", password);
        formdata.append("newPassword", newPassword);
    
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch(url, requestOptions);
        const { status } = response;
        const data = await response.json();

        if(status === 200){
        
            localStorage.setItem('user', JSON.stringify(data.user));

            swal("Contraseña actualizada correctamente!", "","success")
            .then( () => {
                window.location='account';
            });

        } else {
            if(status === 401){
                localStorage.setItem('token', '');
                localStorage.setItem('user', '');
                window.location='/login';
            } else {
                deshabilitarNuevaPassword(false);
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


const isUrl = (s) => {   
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}

btnImagen.addEventListener("click", async (e) => {
    e.preventDefault();

    if(archivo.files.length > 0) {
        deshabilitarCarga(true);
        await actualizarImagen(userInfo._id, archivo);
    } else {
        swal("Error", "Debe seleccionar una imagen!", "error");
    }
});

btnSubmitNewPassword.addEventListener("click", async (e) => {
    e.preventDefault();

    const pass = document.querySelector('#inputPassword').value;
    const newPass = document.querySelector('#inputNewPassword').value;
    const newPass2 = document.querySelector('#inputNewPassword2').value;

    if( pass !== '' && newPass !== '' && newPass2 !== '') {
        if(newPass === newPass2) {
            deshabilitarNuevaPassword(true);
            await changePassword( pass, newPass, newPass2 );
        } else {
            alert("Las contraseñas no coinciden!");
        }

    } else {
        alert("Las contraseñas no pueden estar en blanco!");
    }
    
});

$(document).ready( async function() {

    document.querySelector('#userName').innerText = userInfo.name;
    document.querySelector('#userID').innerText = userInfo._id;
    document.querySelector('#userEmail').innerText = userInfo.email;
    document.querySelector('#userRole').innerText = userInfo.role;
    document.querySelector('#userGoogle').innerText = userInfo.google;
    document.querySelector('#userState').innerText = userInfo.status;
    
    if(isUrl(userInfo.img))
        document.querySelector('#userImage').src = userInfo.img;
    else 
        document.querySelector('#userImage').src = urlApi + "/image/user/"+userInfo._id+'?token='+token;


    if(userInfo.google) {
        //document.querySelector('#actualizarFoto').style.display = 'none';
        document.querySelector('#changePassword').style.display = 'none';
    }


});