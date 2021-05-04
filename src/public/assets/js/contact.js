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

const enviarEmail = async ( from, to, subject, text ) => {

    try {
        const url = `${urlApi}/sendMail`;

        let myHeaders = new Headers();
        myHeaders.append("token", token);
    
        let urlencoded = new URLSearchParams();
        urlencoded.append("from", from);
        urlencoded.append("to", to);
        urlencoded.append("subject", subject);
        urlencoded.append("text", text);
    
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
            swal("Mensaje enviado correctamente!", "","success")
            .then( () => {
                window.location='tasks';
            });
     
        } else {
            if(status === 401){
                localStorage.setItem('token', '');
                localStorage.setItem('user', '');
                window.location='/';
            } else {
                deshabilitarFormularioContacto(false);
                swal("Error", data.error.message, "error");
                console.error(data.error);
            }

        }

    } catch (error) {
        swal("Error", error, "error");
        console.error(error);

    }

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