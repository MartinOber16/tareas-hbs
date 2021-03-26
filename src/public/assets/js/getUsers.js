var token = localStorage.getItem('token');
var dataSet = [];

async function getUsers() {
    var myHeaders = new Headers();
    myHeaders.append("token", token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let status;
    await fetch(urlApiServer + "/api/usuario", requestOptions)
    .then(response => {
        status = response.status;
        return response.text();
      })
    .then(result => {
        var data = JSON.parse(result);
        if(status === 200){
            var users = data.usuarios;
            for(i=0;i<users.length;i++) {
                let nombre = users[i].nombre;
                let email = users[i].email;
                let role = users[i].role;
                let google = users[i].google;
                let estado = users[i].estado;
                let editar = '<a href=editUser?id='+users[i]._id+'><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';
                dataSet.push([nombre, email, role, google, estado, editar]);
            }
        } else {
            if(status === 401){
                swal("Error", data.err.message, "error")
                .then((value) => {
                    localStorage.setItem('token', '');
                    localStorage.setItem('usuario', '');
                    window.location='/';
                });
            } else 
                swal("Error al obtener usuarios!", data.err.message, "error");
        }
    })
    .catch(error => {
        console.error('error', error)
        swal("Error", error, "error");
    });
}

$(document).ready( async function() {
    await getUsers();
    $('#usersTabla').DataTable( {
        //select: true,
        data: dataSet,
        columns: [
        { title: "Nombre" },
        { title: "Email" },
        { title: "Role" },
        { title: "Google" },
        { title: "Estado" },
        { title: "Acciones"}
        ],
        "columnDefs": [
            { "width": "20%", "targets": 0 },
            { "width": "20%", "targets": 1 },
            { "width": "15%", "targets": 2 },
            { "width": "15%", "targets": 3 },
            { "width": "15%", "targets": 4 },
            { "width": "15%", "targets": 5 }
          ],
        //"order": [[ 3, "asc" ], [2, "desc"], [0, "desc"]],
        "order": [[1, "asc"]],
        //dom: 'Bflrtip', // https://datatables.net/reference/option/dom
        language: {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast":"Último",
                "sNext":"Siguiente",
                "sPrevious": "Anterior"
             },
             "sProcessing":"Procesando...",
        }
    });
} );