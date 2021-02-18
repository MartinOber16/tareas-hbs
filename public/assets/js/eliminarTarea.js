const buttonEliminar = document.querySelector('#buttonEliminar');
//var idTarea = document.querySelector('#idTarea').innerText;
//var token = getCookie('token');

async function eliminarTarea(id) {
    var myHeaders = new Headers();
    myHeaders.append("token", token);

    //var urlencoded = new URLSearchParams();
    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        //body: urlencoded,
        redirect: 'follow'
    };

    await fetch(urlApiServer + "/api/tarea/"+id, requestOptions)
        .then(response => response.text())
        .then(result => {
            var data = JSON.parse(result);
            if(data.ok){
                deshabilitarFormularioEditar();
                notification('Tarea eliminada correctamente!', 'success', '', 'tareas');
            }
            else 
                notification('Error al eliminar tarea!', 'error', data.err.message, '');
        })
        .catch(error => {
            notification('Error!', 'error', error, '');
            console.error('error', error)
        });
        
}

buttonEliminar.addEventListener("click", async (e) => {
    e.preventDefault();
    if(confirm('¿Esta seguro que quiere eliminar esta tarea?'))
        await eliminarTarea(idTarea);
   
});