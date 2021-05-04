const name = document.querySelector('#name');
const email = document.querySelector('#email');
const mensaje = document.querySelector('#mensaje');
const buttonComentario= document.querySelector('#contactSubmit');

const deshabilitarFormularioContacto = (value) => {
    name.disabled = value;
    email.disabled = value;
    mensaje.disabled = value;
    buttonComentario.disabled = value;
}

buttonComentario.addEventListener("click", async (e) => {
    e.preventDefault();
    if(document.querySelector('#mensaje').value != "") {
        deshabilitarFormularioContacto(true);
        await enviarEmail(name.value + '(' + email.value + ')', 'martin.obermeier@gmail.com', 'Contacto Tareas', mensaje.value);
    }
    else {
        alert("Debe ingresar un comentario!");
    }
});

$(document).ready( async function() {
    name.value = userInfo.name;
    email.value = userInfo.email;
});