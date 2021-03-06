const archivo = document.querySelector('#archivo');
const buttonImagen = document.querySelector('#buttonImagen');
//var token = getCookie('token');
var token = localStorage.getItem('token');

function deshabilitarCarga(){
    archivo.disabled = true;
    buttonImagen.disabled = true;
}

async function actualizarImagen(id, archivo) {
    var myHeaders = new Headers();
    myHeaders.append("token", token);

    var formdata = new FormData();
    formdata.append("archivo", archivo.files[0], archivo.files[0].name);
    
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    let status;
    await fetch(urlApiServer + "/api/upload/usuario/"+id, requestOptions)
        .then(response => {
            status = response.status;
            return response.text();
          })
        .then(result => {
            var data = JSON.parse(result);
            if(status === 200){
                data.usuario
                //document.cookie = 'usuario=' + JSON.stringify(data.usuario);
                localStorage.setItem('usuario', JSON.stringify(data.usuario)); // FIXME: arreglar esto 
                deshabilitarCarga();
                swal("Imagen actualizada correctamente!", "Presione OK para continuar", "success")
                .then((value) => {
                    window.location='infoUsuario';
                });
            }
            else 
                swal("Error al actualizar imagen!", data.err.message, "error");

        })
        .catch(error => {
            swal("Error", error, "error");
            console.error('error', error)
        });

}

buttonImagen.addEventListener("click", async (e) => {
    e.preventDefault();
    await actualizarImagen(userInfo._id, archivo);
});


function isUrl(s) {   
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}

$(document).ready( async function() {
    document.querySelector('#userName').innerText = userInfo.nombre;
    document.querySelector('#userID').innerText = userInfo._id;
    document.querySelector('#userEmail').innerText = userInfo.email;
    document.querySelector('#userRole').innerText = userInfo.role;
    document.querySelector('#userGoogle').innerText = userInfo.google;
    document.querySelector('#userState').innerText = userInfo.estado;
    
    try {
        if(isUrl(userInfo.img))
            document.querySelector('#userImage').src = userInfo.img;
        else
            document.querySelector('#userImage').src = urlApiServer + "/api/imagen/usuario/"+userInfo.img+'?token='+token;

    } catch (error) {
        swal("Error", error, "error");
        console.error(error);
    }

});