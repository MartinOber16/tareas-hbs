const urlApi = 'https://mo-tasks-server.herokuapp.com/api';
const token = localStorage.getItem('token');
let dataSet = [];

const getTasks = async () => {
    
    try {
        const url = `${urlApi}/task`;

        let myHeaders = new Headers();
        myHeaders.append("token", token);
    
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
    
        const response = await fetch(url, requestOptions);
        const { status } = response;
        const data = await response.json();

        if(status === 200){
            let tasks = data.tasks;
            for(i=0;i<tasks.length;i++) {
                let titulo = tasks[i].title;
                let desc = tasks[i].description;
                let fechaLimite = tasks[i].date; //? parsearFecha(tasks[i].date) : "";
                let realizada = tasks[i].done ? '<span class="verde"><i class="fa fa-check-square-o" aria-hidden="true"></i> Realizada</span>' : '<i class="fa fa-square-o" aria-hidden="true"></i> Pendiente';
                let editar = '<a href=editTask?id='+tasks[i]._id+'><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';
                dataSet.push([titulo, desc, fechaLimite, realizada, editar]);
            }
            
        } else {
            if(status === 401){
                localStorage.setItem('token', '');
                localStorage.setItem('user', '');
                //window.location='/';
            } else {
                console.error(data)
            }
                
        }

    } catch (error) {
        console.error(error)
    }

}

function parsearFecha(fecha) {
    let date = new Date(fecha);
    let day = date.getDate() + 1;
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let dayString = ''

    if(day < 10) {
        dayString += `0${day}`;
    }
    else {
        dayString += `${day}`;
    }

    if(month < 10){
        return `${dayString}-0${month}-${year}`;
    }else{
        return `${dayString}-${month}-${year}`;
    }
}

$(document).ready( async function() {
    await getTasks();
    $('#tasks').DataTable( {
        //select: true,
        data: dataSet,
        columns: [
        { title: "Titulo" },
        { title: "Descripción" },
        { title: "Fecha limite" },
        { title: "Estado" },
        { title: "Acciones"}
        ],
        "columnDefs": [
            { "width": "20%", "targets": 0 },
            { "width": "45%", "targets": 1 },
            { "width": "15%", "targets": 2 },
            { "width": "15%", "targets": 3 },
            { "width": "15%", "targets": 4 }
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