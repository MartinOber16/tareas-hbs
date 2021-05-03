const urlApi = 'https://mo-tasks-server.herokuapp.com/api';
const token = localStorage.getItem('token');
const userInfo = JSON.parse( localStorage.getItem('user') );

const archivo = document.querySelector('#archivo');
const buttonImagen = document.querySelector('#buttonImagen');
const btnSubmitNewPassword =  document.querySelector('#btnSubmitNewPassword');


const deshabilitarCarga = (value) => {
    archivo.disabled = value;
    buttonImagen.disabled = value;
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

            if( confirm("Imagen actualizada correctamente!") ) {
                window.location='account';
            }

        } else {
            if(status === 401){
                localStorage.setItem('token', '');
                localStorage.setItem('user', '');
                window.location='/';
            } else {
                deshabilitarCarga(false);
                alert(data.error.message);
                console.error(data);
            }

        }

    } catch (error) {
        alert(error);
        console.error(error);

    }

}

const changePassword = async ( password, newPassword, newPassword2 ) => {

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

            if( confirm("Contraseña actualizada correctamente!") ) {
                window.location='account';
            }

        } else {
            if(status === 401){
                localStorage.setItem('token', '');
                localStorage.setItem('user', '');
                window.location='/';
            } else {
                deshabilitarNuevaPassword(false);
                alert(data.error.message);
                console.error(data);
            }
    
        }
         
    } catch (error) {
        alert(error);
        console.error(error);

    }

}



const isUrl = (s) => {   
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}

buttonImagen.addEventListener("click", async (e) => {
    e.preventDefault();
    deshabilitarCarga(true);
    await actualizarImagen(userInfo._id, archivo);
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
    
    try {
        if(isUrl(userInfo.img))
            document.querySelector('#userImage').src = userInfo.img;
        else
            document.querySelector('#userImage').src = urlApi + "/image/user/"+userInfo.img+'?token='+token;

    } catch (error) {
        alert(error);
        console.error(error);
    }

});