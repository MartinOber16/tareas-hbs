var token = undefined;
var usuario = undefined;
var userInfo = undefined;

function validarUsuario(){
    // Si no existe token salgo
    //token = retrieve_cookie('token');
    token = localStorage.getItem('token');
    if(token === undefined || token === '' || token === null){
        return false;
    }

    setNombreUsuario();
    return true;
}

function setNombreUsuario(){
    // Si no existe usuario salgo
    //usuario = retrieve_cookie('usuario');
    usuario = localStorage.getItem('usuario');
    if(usuario === undefined || usuario === '')
       return false;

    // Pongo el nombre del usuario para saber quien esta conectado
    userInfo = JSON.parse(usuario);
    document.querySelector('#nombreUsuario').innerHTML = userInfo.nombre;

    return true;
}
