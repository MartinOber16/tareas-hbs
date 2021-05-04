//const urlApi = 'https://mo-tasks-server.herokuapp.com/api';
//const token = localStorage.getItem('token');

const idTarea = document.querySelector('#idTarea').innerText;
const inputTitulo = document.querySelector('#inputTitulo');
const inputDescripcion = document.querySelector('#inputDescripcion');
const inputFechaLimite = document.querySelector('#inputFechaLimite');
const checkCompleta = document.querySelector('#checkCompleta');
const buttonSave = document.querySelector('#buttonSave');
const buttonCancel = document.querySelector('#buttonCancel');
const buttonEliminar = document.querySelector('#buttonEliminar');

const deshabilitarFormularioEditar = (value) => {
    inputTitulo.disabled = value;
    inputDescripcion.disabled = value;
    inputFechaLimite.disabled = value;
    checkCompleta.disabled = value;
    buttonSave.disabled = value;
    buttonCancel.disabled = value;
    buttonEliminar.disabled = value;
}

const obtenerTarea = async (id) => {

    try {
        const url = `${urlApi}/task/${id}`;

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
            const task = data.task[0];
            inputTitulo.value=task.title;
            inputDescripcion.value=task.description;
            inputFechaLimite.value= task.date ? parsearFecha2(task.date) : null; // TODO: ver que pasa con el formato de la fecha para el campo del formulario
            checkCompleta.checked=task.done;

        }  else {
            if(status === 401){
                localStorage.setItem('token', '');
                localStorage.setItem('user', '');
                window.location='/';
            } else {
                deshabilitarFormularioEditar(false);
                swal("Error", data.error.message, "error");
                console.error(data.error);
            }
        }

    } catch (error) {
        swal("Error", error, "error");
        console.error(error)
    }

}

const actualizarTarea = async (id, titulo, descripcion, fechaLimite, realizada) => {

    try {
        const url = `${urlApi}/task/${id}`;

        let myHeaders = new Headers();
        myHeaders.append("token", token);

        let urlencoded = new URLSearchParams();
        urlencoded.append("title", titulo);
        urlencoded.append("description", descripcion);
        urlencoded.append("date", fechaLimite);
        urlencoded.append("done", realizada);
    
        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        const response = await fetch(url, requestOptions);
        const { status } = response;
        const data = await response.json();

        if(status === 200){
            swal("Tarea actualizada correctamente!", "","success")
            .then( () => {
                window.location='tasks';
            });

        }  else {
            if(status === 401){
                localStorage.setItem('token', '');
                localStorage.setItem('user', '');
                window.location='/';
            } else {
                deshabilitarFormularioEditar(false);
                alert(data.error);
                console.error(data)
            }
        }

    } catch (error) {
        swal("Error", error, "error");
        console.error(error)
    }

}

const eliminarTarea = async (id) => {

    try {
        const url = `${urlApi}/task/${id}`;

        let myHeaders = new Headers();
        myHeaders.append("token", token);
    
        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(url, requestOptions);
        const { status } = response;
        const data = await response.json();
        
        if(status === 200){
            swal("Tarea eliminada correctamente!", "","success")
            .then( () => {
                window.location='tasks';
            });

        }  else {
            if(status === 401){
                localStorage.setItem('token', '');
                localStorage.setItem('user', '');
                window.location='/';
            } else {
                deshabilitarFormularioEditar(false);
                alert(data.error);
                console.error(data)
            }
        }

    } catch (error) {
        swal("Error", error, "error");
        console.error(error)
    }
        
}


const parsearFecha2 = (fecha) => {
    let date = new Date(fecha);
    let day = date.getDate() + 1;
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if(month < 10){
        return `${year}-0${month}-${day}`;
    }else{
        return `${year}-${month}-${day}`;
    }
}

buttonSave.addEventListener("click", async (e) => {
    e.preventDefault();
    deshabilitarFormularioEditar(true);
    await actualizarTarea( idTarea,inputTitulo.value, inputDescripcion.value, inputFechaLimite.value, checkCompleta.checked );

});

buttonEliminar.addEventListener("click", async (e) => {
    e.preventDefault();

    swal({
        title: "¿Esta seguro que quiere eliminar esta tarea?",
        text: "Una vez eliminada, no podrá recuperar esta tarea",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then( async (willDelete) => {
        if (willDelete) {
            deshabilitarFormularioEditar(true);
            await eliminarTarea(idTarea);
        } 
      });
   
});


$(document).ready( async function() {
    deshabilitarFormularioEditar(true);
    await obtenerTarea(idTarea);
    deshabilitarFormularioEditar(false);

});
