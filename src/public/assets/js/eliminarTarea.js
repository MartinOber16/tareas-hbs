const buttonEliminar = document.querySelector('#buttonEliminar');
//var idTarea = document.querySelector('#idTarea').innerText;
//var token = getCookie('token');
var token = localStorage.getItem('token');

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

    let status;
    await fetch(urlApiServer + "/api/tarea/"+id, requestOptions)
        .then(response => {
            status = response.status;
            return response.text();
          })
        .then(result => {
            var data = JSON.parse(result);
            if(status === 200){
                deshabilitarFormularioEditar();
                swal("Tarea eliminada correctamente!", "Presione OK para continuar", "success")
                .then((value) => {
                    window.location='tareas';
                });
            }
            else 
                swal("Error al eliminar tarea!", data.err.message, "error");

        })
        .catch(error => {
            swal("Error", error, "error");
            console.error('error', error)
        });
        
}

buttonEliminar.addEventListener("click", (e) => {
    e.preventDefault();

    swal({
        title: "¿Esta seguro que quiere eliminar esta tarea?",
        text: "Una vez eliminado, no podrá recuperarla.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete)
            eliminarTarea(idTarea);
      });
   
});