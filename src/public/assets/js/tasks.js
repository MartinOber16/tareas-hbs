const txtMsj = document.querySelector('#txtMessage');
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
            const tasks = data.tasks;
            for(i=0;i<tasks.length;i++) {
                const title = '<a href=editTask?id='+tasks[i]._id+'>' + tasks[i].title; + '</a>';
                //const desc = tasks[i].description;
                const date = tasks[i].date ? parsearFecha(tasks[i].date) : "";
                const done = tasks[i].done ? '<span class="verde"><i class="fa fa-check-square-o" aria-hidden="true"></i> Realizada</span>' : '<i class="fa fa-square-o" aria-hidden="true"></i> Pendiente';
                dataSet.push([title, date, done]);
            }
            
        } else {
            if(status === 401){
                localStorage.setItem('token', '');
                localStorage.setItem('user', '');
                window.location='/login';
            } else {
                swal("Error", data.error.message, "error");
                console.error(data.error);
            }
                
        }

    } catch (error) {
        swal("Error", error, "error");
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
        return `${year}-0${month}-${dayString}`;
    }else{
        return `${year}-${month}-${dayString}`;
    }
}

$(document).ready( async function() { 
    
    await getTasks();
    document.querySelector('#txtMessage').style.display = 'none';
    document.querySelector('#btnNewTask').hidden = false;

    $('#tasksTable').DataTable( {
        //select: true,
        data: dataSet,
        columns: [
        { title: "Título" },
        //{ title: "Descripción" },
        { title: "Fecha" },
        { title: "Estado" },
        //{ title: "Acciones"}
        ],
        "columnDefs": [
            { "width": "40%", "targets": 0 },
            //{ "width": "45%", "targets": 1 },
            { "width": "30%", "targets": 1 },
            { "width": "30%", "targets": 2 },
            //{ "width": "15%", "targets": 4 }
          ],
        //"order": [[ 3, "asc" ], [2, "desc"], [0, "desc"]],
        "order": [[2, "asc"],[0, "asc"]],
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