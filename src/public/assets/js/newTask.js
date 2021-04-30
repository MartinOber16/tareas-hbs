const urlApi = 'https://mo-tasks-server.herokuapp.com/api';
const inputTitulo = document.querySelector('#inputTitulo');
const inputDescripcion = document.querySelector('#inputDescripcion');
const inputFechaLimite = document.querySelector('#inputFechaLimite');
const checkCompleta = document.querySelector('#checkCompleta');
const buttonSave = document.querySelector('#buttonSave');
const buttonCancel = document.querySelector('#buttonCancel');
const token = localStorage.getItem('token');

const deshabilitarFormulario = () => {
    inputTitulo.disabled = true;
    inputDescripcion.disabled = true;
    inputFechaLimite.disabled = true;
    checkCompleta.disabled = true;
    buttonSave.disabled = true;
    buttonCancel.disabled = true;
}
    
const crearTarea = async (titulo, descripcion, fechaLimite, realizada) => {

    try {
        const url = `${urlApi}/task`;

        let myHeaders = new Headers();
        myHeaders.append("token", token);

        let urlencoded = new URLSearchParams();
        urlencoded.append("title", titulo);
        urlencoded.append("description", descripcion);
        urlencoded.append("date", fechaLimite);
        urlencoded.append("done", realizada);
    
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        const response = await fetch(url, requestOptions);
        const { status } = response;
        const data = await response.json();

        if(status === 200){
            deshabilitarFormulario();
            if( confirm('Tarea creada correctamente!') )
                window.location='tasks';

        }  else {
            console.error(data)
            localStorage.setItem('token', '');
            localStorage.setItem('user', '');
            window.location='/';
        }

    } catch (error) {
        console.error(error)
    }

}

buttonSave.addEventListener("click", async (e) => {
    e.preventDefault();
    await crearTarea( inputTitulo.value, inputDescripcion.value, inputFechaLimite.value, checkCompleta.checked );

});
