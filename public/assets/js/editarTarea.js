const idTarea = document.querySelector('#idTarea').innerText;
const inputTitulo = document.querySelector('#inputTitulo');
const inputDescripcion = document.querySelector('#inputDescripcion');
const inputFechaLimite = document.querySelector('#inputFechaLimite');
const checkCompleta = document.querySelector('#checkCompleta');
//var token = getCookie('token');
const buttonSave = document.querySelector('#buttonSave');
const buttonCancel = document.querySelector('#buttonCancel');

function deshabilitarFormularioEditar(){
    inputTitulo.disabled = true;
    inputDescripcion.disabled = true;
    inputFechaLimite.disabled = true;
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
        inputFechaLimite.value= tarea.fechaLimite ? parsearFecha2(tarea.fechaLimite) : null;
        checkCompleta.checked=tarea.realizada;
    })
    .catch(error => console.error('error', error));

}

async function actualizarTarea(id, titulo, descripcion, fechaLimite, realizada) {
    var myHeaders = new Headers();
    myHeaders.append("token", token);

    var urlencoded = new URLSearchParams();
    urlencoded.append("titulo", titulo);
    urlencoded.append("descripcion", descripcion);
    urlencoded.append("fechaLimite", fechaLimite);
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

function parsearFecha2(fecha) {
    let date = new Date(fecha);
    let day = date.getDate() + 1;
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if(month < 10){
        return `${year}-0${month}-${day}`;
    }else{
        return `${year}-${month}-${day}`;
    }
}

buttonSave.addEventListener("click", async (e) => {
    e.preventDefault();
    await actualizarTarea(idTarea,inputTitulo.value, inputDescripcion.value, inputFechaLimite.value, checkCompleta.checked);
});

$(document).ready( async function() {
    obtenerTarea(idTarea);
});
