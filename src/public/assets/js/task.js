const idTarea = document.querySelector('#idTarea').innerText;
const inputTitle = document.querySelector('#inputTitle');
const inputDescription = document.querySelector('#inputDescription');
const inputDate = document.querySelector('#inputDate');
const checkDone = document.querySelector('#checkDone');
const btnSave = document.querySelector('#btnSave');
const btnCancel = document.querySelector('#btnCancel');
const btnDelete = document.querySelector('#btnDelete');

const deshabilitarFormularioEditar = (value) => {
    inputTitle.disabled = value;
    inputDescription.disabled = value;
    inputDate.disabled = value;
    checkDone.disabled = value;
    btnSave.disabled = value;
    btnCancel.disabled = value;
    btnDelete.disabled = value;
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
            inputTitle.value=task.title;
            inputDescription.value=task.description;
            inputDate.value= task.date ? parsearFecha(task.date) : null;
            checkDone.checked=task.done;

            deshabilitarFormularioEditar(false);

        }  else {
            if(status === 401){
                localStorage.setItem('token', '');
                localStorage.setItem('user', '');
                window.location='login';
            } else {
                deshabilitarFormularioEditar(false);
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

const actualizarTarea = async (id, title, description, date, done) => {

    try {
        const url = `${urlApi}/task/${id}`;

        let myHeaders = new Headers();
        myHeaders.append("token", token);

        let urlencoded = new URLSearchParams();
        urlencoded.append("title", title);
        urlencoded.append("description", description);
        urlencoded.append("date", date);
        urlencoded.append("done", done);
    
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
                window.location='login';
            } else {
                deshabilitarFormularioEditar(false);
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
                window.location='login';
            } else {
                deshabilitarFormularioEditar(false);
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

const parsearFecha = (fecha) => {
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

btnSave.addEventListener("click", async (e) => {
    e.preventDefault();
    deshabilitarFormularioEditar(true);
    await actualizarTarea( idTarea,inputTitle.value, inputDescription.value, inputDate.value, checkDone.checked );

});

btnDelete.addEventListener("click", async (e) => {
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

deshabilitarFormularioEditar(true);

$(document).ready( async function() {
    
    await obtenerTarea(idTarea); 

});
