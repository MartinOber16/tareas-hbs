const nombre = document.querySelector('#name');
const email = document.querySelector('#email');
const mensaje = document.querySelector('#mensaje');
const buttonComentario= document.querySelector('#contactSubmit');

function deshabilitarFormularioContacto(){
    nombre.disabled = true;
    email.disabled = true;
    mensaje.disabled = true;
    buttonComentario.disabled = true;
}

async function enviarEmail( from, to, subject, text ){
    var myHeaders = new Headers();
    myHeaders.append("token", token);

    var urlencoded = new URLSearchParams();
    urlencoded.append("from", from);
    urlencoded.append("to", to);
    urlencoded.append("subject", subject);
    urlencoded.append("text", text);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    let status;
    await fetch(urlApiServer + "/sendMail", requestOptions)
        .then(response => {
        status = response.status;
        return response.json();
      })
        .then(data => {
            //var data = JSON.parse(result);
            if(status === 200){
                swal("Mensaje enviado", "Gracias por su comentario!", "success")
                .then((value) => {
                    window.location='tareas';
                });

            } else {
                console.log(data);
                swal("Error al enviar email!", 'Vuelva a intentarlo mas tarde', "error");
            } 
        })
        .catch(error => {
            swal("Error", error, "error");
            console.error('error', error)
        });
}

buttonComentario.addEventListener("click", async (e) => {
    e.preventDefault();
    if(document.querySelector('#mensaje').value != "") {
        deshabilitarFormularioContacto();
        await enviarEmail(nombre.value + '(' + email.value + ')', 'martin.obermeier@gmail.com', 'Contacto Tareas', mensaje.value);
    }
    else {
        swal("Error", "Debe ingresar un comentario!", "error")
    }
});

$(document).ready( async function() {
    nombre.value = userInfo.nombre;
    email.value = userInfo.email;
});