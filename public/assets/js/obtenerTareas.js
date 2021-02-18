//var token = getCookie('token');
var dataSet = [];

async function obtenerTareas() {
    var myHeaders = new Headers();
    myHeaders.append("token", token);

    //var urlencoded = new URLSearchParams();
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        //body: urlencoded,
        redirect: 'follow'
    };

    await fetch(urlApiServer + "/api/tarea", requestOptions)
    .then(response => response.text())
    .then(result => {
        var data = JSON.parse(result);
        var tareas = data.tareas;
        for(i=0;i<tareas.length;i++) {
            let titulo = tareas[i].titulo;
            let desc = tareas[i].descripcion;
            let fechaLimite = tareas[i].fechaLimite ? parsearFecha(tareas[i].fechaLimite) : "";
            let realizada = tareas[i].realizada ? '<span class="verde"><i class="fa fa-check-square-o" aria-hidden="true"></i> Realizada</span>' : '<i class="fa fa-square-o" aria-hidden="true"></i> Pendiente';
            let editar = '<a href=editarTarea?id='+tareas[i]._id+'><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';
            dataSet.push([titulo, desc, fechaLimite, realizada, editar]);
        }
    })
    .catch(error => {
        swal("Error", error, "error");
        console.error('error', error)
    });
}

function parsearFecha(fecha) {
    let date = new Date(fecha);
    let day = date.getDate() + 1;
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if(month < 10){
        return `${day}-0${month}-${year}`;
    }else{
        return `${day}-${month}-${year}`;
    }
}

$(document).ready( async function() {
    await obtenerTareas();
    $('#tareasTabla').DataTable( {
        //select: true,
        data: dataSet,
        columns: [
        { title: "Titulo" },
        { title: "Descripción" },
        { title: "Fecha limite" },
        { title: "Estado" },
        { title: "Acciones"}
        ],
        //"order": [[ 3, "asc" ], [2, "desc"], [0, "desc"]],
        "order": [[3, "asc"]],
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