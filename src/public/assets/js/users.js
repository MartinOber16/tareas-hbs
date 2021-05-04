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
            let users = data.users;
            for(i=0;i<users.length;i++) {
                let name = users[i].name;
                let email = users[i].email;
                let role = users[i].role;
                let google = users[i].google ? 'Google' : 'Local';
                let estado = users[i].status ? 'Activo' : 'Inactivo';
                let editar = '<a href=editUser?id='+users[i]._id+'><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>';
                dataSet.push([name, email, role, google, estado, editar]);
            }
            
            
        } else {
            if(status === 401){
                localStorage.setItem('token', '');
                localStorage.setItem('user', '');
                window.location='/';
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

$(document).ready( async function() {

    await getUsers();
    document.querySelector('#txtMessage').style.display = 'none';
    document.querySelector('#btnNewUser').hidden = false;


    $('#usersTable').DataTable( {
        //select: true,
        data: dataSet,
        columns: [
        { title: "Nombre" },
        { title: "Email" },
        { title: "Role" },
        { title: "Cuenta" },
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