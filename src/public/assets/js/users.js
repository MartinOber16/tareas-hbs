let dataSet = [];

const getUsers = async () => {
    
    try {
        const url = `${urlApi}/user`;

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
            const users = data.users;
            for(i=0;i<users.length;i++) {
                const name = '<a href=editUser?id='+users[i]._id+'>' +users[i].name + '</a>';
                //const email = users[i].email;
                const role = users[i].role;
                const google = users[i].google ? 'Google' : 'Local';
                //const estado = users[i].status ? 'Activo' : 'Inactivo';
                dataSet.push( [name, role, google] );
            }
            
            
        } else {
            if(status === 401){
                localStorage.setItem('token', '');
                localStorage.setItem('user', '');
                window.location='/';
            } else {
                const error = data.error || data.errors[0];    
                swal("Error", error.msg, "error");
                console.error(data);
            }
                
        }

    } catch (error) {
        swal("Error", error, "error");
        console.error(error)
    }
    
}

$(document).ready( async function() {

    await getUsers();
    document.querySelector('#txtmsg').style.display = 'none';
    document.querySelector('#btnNewUser').hidden = false;


    $('#usersTable').DataTable( {
        //select: true,
        data: dataSet,
        columns: [
        { title: "Nombre" },
        //{ title: "Email" },
        { title: "Role" },
        { title: "Cuenta" },
        //{ title: "Estado" },
        //{ title: "Acciones"}
        ],
        "columnDefs": [
            { "width": "40%", "targets": 0 },
            //{ "width": "20%", "targets": 1 },
            { "width": "30%", "targets": 1 },
            { "width": "30%", "targets": 2 },
            //{ "width": "15%", "targets": 4 },
            //{ "width": "15%", "targets": 5 }
          ],
        //"order": [[ 3, "asc" ], [2, "desc"], [0, "desc"]],
        "order": [[0, "asc"]],
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