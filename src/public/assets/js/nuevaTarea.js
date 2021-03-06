const inputTitulo = document.querySelector('#inputTitulo');
const inputDescripcion = document.querySelector('#inputDescripcion');
const inputFechaLimite = document.querySelector('#inputFechaLimite');
const checkCompleta = document.querySelector('#checkCompleta');
//var token = getCookie('token');
var token = localStorage.getItem('token');
const buttonSave = document.querySelector('#buttonSave');
const buttonCancel = document.querySelector('#buttonCancel');

function deshabilitarFormulario(){
    inputTitulo.disabled = true;
    inputDescripcion.disabled = true;
    inputFechaLimite.disabled = true;
    checkCompleta.disabled = true;
    buttonSave.disabled = true;
    buttonCancel.disabled = true;
}
    
async function crearTarea(titulo, descripcion, fechaLimite, realizada) {
    var myHeaders = new Headers();
    myHeaders.append("token", token);

    var urlencoded = new URLSearchParams();
    urlencoded.append("titulo", titulo);
    urlencoded.append("descripcion", descripcion);
    urlencoded.append("fechaLimite", fechaLimite);
    urlencoded.append("realizada", realizada);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    let status;
    await fetch(urlApiServer + "/api/tarea", requestOptions)
        .then(response => {
            status = response.status;
            return response.text();
          })
        .then(result => {
            var data = JSON.parse(result);
            if(status === 201){
                deshabilitarFormulario();
                swal("Tarea creada correctamente!", "Presione OK para continuar", "success")
                .then((value) => {
                    window.location='tareas';
                });
            }
            else 
                swal("Error al crear tarea!", data.err.message, "error");

        })
        .catch(error => {
            swal("Error", error, "error");
            console.error('error', error)
        });

}

buttonSave.addEventListener("click", async (e) => {
    e.preventDefault();
    await crearTarea(inputTitulo.value, inputDescripcion.value, inputFechaLimite.value, checkCompleta.checked);
});
