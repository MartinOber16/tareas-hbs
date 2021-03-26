const buttonEliminar = document.querySelector('#buttonEliminar');
//var idTarea = document.querySelector('#idUser').innerText;
var token = localStorage.getItem('token');

async function eliminarUsuario(id) {
    var myHeaders = new Headers();
    myHeaders.append("token", token);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    let status;
    await fetch(urlApiServer + "/api/usuario/"+id, requestOptions)
        .then(response => {
            status = response.status;
            return response.text();
          })
        .then(result => {
            var data = JSON.parse(result);
            if(status === 200){
                deshabilitarFormularioEditar();
                swal("Usuario eliminado correctamente!", "Presione OK para continuar", "success")
                .then((value) => {
                    window.location='users';
                });
            } else {
                if(status === 401){
                    swal("Error", data.err.message, "error")
                    .then((value) => {
                        localStorage.setItem('token', '');
                        localStorage.setItem('usuario', '');
                        window.location='/';
                    });
                } else 
                    swal("Error al eliminar usuario!", data.err.message, "error");
            }
        })
        .catch(error => {
            swal("Error", error, "error");
            console.error('error', error)
        });
        
}

buttonEliminar.addEventListener("click", (e) => {
    e.preventDefault();

    swal({
        title: "¿Esta seguro que quiere eliminar este usuario?",
        text: "Una vez eliminado, no podrá recuperarlo.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete)
            eliminarUsuario(idUser);
      });
   
});