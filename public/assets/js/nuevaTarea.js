const inputTitulo = document.querySelector('#inputTitulo');
const inputDescripcion = document.querySelector('#inputDescripcion');
const checkCompleta = document.querySelector('#checkCompleta');
//var token = getCookie('token');
const buttonSave = document.querySelector('#buttonSave');
const buttonCancel = document.querySelector('#buttonCancel');

function deshabilitarFormulario(){
    inputTitulo.disabled = true;
    inputDescripcion.disabled = true;
    checkCompleta.disabled = true;
    buttonSave.disabled = true;
    buttonCancel.disabled = true;
}
    
async function crearTarea(titulo, descripcion, realizada) {
    var myHeaders = new Headers();
    myHeaders.append("token", token);

    var urlencoded = new URLSearchParams();
    urlencoded.append("titulo", titulo);
    urlencoded.append("descripcion", descripcion);
    urlencoded.append("realizada", realizada);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    await fetch(urlApiServer + "/api/tarea", requestOptions)
        .then(response => response.text())
        .then(result => {
            var data = JSON.parse(result);
            if(data.ok){
                deshabilitarFormulario();
                notification('Tarea creada correctamente!', 'success', '', 'tareas');
            }
            else 
                notification('Error al crear tarea!', 'error', data.err.message, '');
        })
        .catch(error => {
            notification('Error!', 'error', error, '');
            console.error('error', error)
        });

}

buttonSave.addEventListener("click", async (e) => {
    e.preventDefault();
    await crearTarea(inputTitulo.value, inputDescripcion.value, checkCompleta.checked);
});
