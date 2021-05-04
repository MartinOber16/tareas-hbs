const enviarEmail = async ( from, to, subject, text ) => {

    try {
        const url = `${urlApi}/sendMail`;

        let myHeaders = new Headers();
        myHeaders.append("token", token);
    
        let urlencoded = new URLSearchParams();
        urlencoded.append("from", from);
        urlencoded.append("to", to);
        urlencoded.append("subject", subject);
        urlencoded.append("text", text);
    
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
            swal("Mensaje enviado correctamente!", "","success")
            .then( () => {
                window.location='tasks';
            });
     
        } else {
            if(status === 401){
                localStorage.setItem('token', '');
                localStorage.setItem('user', '');
                window.location='/login';
            } else {
                deshabilitarFormularioContacto(false);
                const error = data.error || data.errors[0];    
                swal("Error", error.msg, "error");
                console.error(data);
            }

        }

    } catch (error) {
        swal("Error", error, "error");
        console.error(error);

    }

}