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

buttonComentario.addEventListener("click", async (e) => {
    e.preventDefault();
    if(document.querySelector('#mensaje').value != "") {
        deshabilitarFormularioContacto();
        notification('Gracias por su comentario!', 'success', '', 'tareas');
    }
    else {
        notification('Error', 'error', 'Debe ingresar un comentario.', '');
    }
});

$(document).ready( async function() {
    //document.querySelector('#name').value = userInfo.nombre;
    nombre.value = userInfo.nombre;
    //document.querySelector('#email').value = userInfo.email;
    email.value = userInfo.email;
});