const idTarea = document.querySelector('#idTarea').innerText;
const inputTitulo = document.querySelector('#inputTitulo');
const inputDescripcion = document.querySelector('#inputDescripcion');
const checkCompleta = document.querySelector('#checkCompleta');
//var token = getCookie('token');
const buttonSave = document.querySelector('#buttonSave');
const buttonCancel = document.querySelector('#buttonCancel');

function deshabilitarFormularioEditar(){
    inputTitulo.disabled = true;
    inputDescripcion.disabled = true;
    checkCompleta.disabled = true;
    buttonSave.disabled = true;
    buttonCancel.disabled = true;
    buttonEliminar.disabled = true;
}

async function obtenerTarea(id) {

    var myHeaders = new Headers();
    myHeaders.append("token", token);

    //var urlencoded = new URLSearchParams();
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    //body: urlencoded,
    redirect: 'follow'
    };

    await fetch(urlApiServer + "/api/tarea/"+id, requestOptions)
    .then(response => response.text())
    .then(result => {
        var data = JSON.parse(result);
        var tarea = data.tareaDB[0];
        inputTitulo.value=tarea.titulo;
        inputDescripcion.value=tarea.descripcion;
        checkCompleta.checked=tarea.realizada;
    })
    .catch(error => console.error('error', error));

}

async function actualizarTarea(id, titulo, descripcion, realizada) {
    var myHeaders = new Headers();
    myHeaders.append("token", token);

    var urlencoded = new URLSearchParams();
    urlencoded.append("titulo", titulo);
    urlencoded.append("descripcion", descripcion);
    urlencoded.append("realizada", realizada);

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    await fetch(urlApiServer + "/api/tarea/"+id, requestOptions)
        .then(response => response.text())
        .then(result => {
            var data = JSON.parse(result);
            if(data.ok){
                deshabilitarFormularioEditar();
                swal("Tarea actualizada correctamente!", "Presione OK para continuar", "success")
                .then((value) => {
                    window.location='tareas';
                });
            }
            else 
                swal("Error al actualizar tarea!", data.err.message, "error");
                
        })
        .catch(error => {
            swal("Error", error, "error");
            console.error('error', error)
        });

}

buttonSave.addEventListener("click", async (e) => {
    e.preventDefault();
    await actualizarTarea(idTarea,inputTitulo.value, inputDescripcion.value, checkCompleta.checked);
});

$(document).ready( async function() {
    obtenerTarea(idTarea);
});
