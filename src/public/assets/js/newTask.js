const inputTitle = document.querySelector('#inputTitle');
const inputDescription = document.querySelector('#inputDescription');
const inputDate = document.querySelector('#inputDate');
const checkDone = document.querySelector('#checkDone');
const btnSave = document.querySelector('#btnSave');
const btnCancel = document.querySelector('#btnCancel');

const deshabilitarFormulario = (value) => {
    inputTitle.disabled = value;
    inputDescription.disabled = value;
    inputDate.disabled = value;
    checkDone.disabled = value;
    btnSave.disabled = value;
    btnCancel.disabled = value;
}
    
const crearTarea = async (title, description, date, done) => {

    try {
        const url = `${urlApi}/task`;

        let myHeaders = new Headers();
        myHeaders.append("token", token);

        let urlencoded = new URLSearchParams();
        urlencoded.append("title", title);
        urlencoded.append("description", description);
        urlencoded.append("date", date);
        urlencoded.append("done", done);
    
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
            swal("Tarea creada correctamente!", "","success")
            .then( () => {
                window.location='tasks';
            });

        }  else {
            if(status === 401){
                localStorage.setItem('token', '');
                localStorage.setItem('user', '');
                window.location='login';
            } else {
                deshabilitarFormulario(false);
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

btnSave.addEventListener("click", async (e) => {
    e.preventDefault();
    deshabilitarFormulario(true);
    await crearTarea( inputTitle.value, inputDescription.value, inputDate.value, checkDone.checked );

});
