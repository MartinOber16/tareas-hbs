function onSignIn(googleUser) {
    //var profile = googleUser.getBasicProfile();
    //console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    //console.log('Name: ' + profile.getName());
    //console.log('Image URL: ' + profile.getImageUrl());
    //console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    
    // Obtengo el token del usuario de Google
    var id_token = googleUser.getAuthResponse().id_token;

    // Envio al servidor el token
    var xhr = new XMLHttpRequest();
    xhr.open('POST', urlApiServer + '/api/google');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        var data =  JSON.parse(xhr.responseText)
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        window.location = "tareas";
    };
    xhr.send('idtoken=' + id_token);
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.setItem('token', '');
        localStorage.setItem('usuario', '');
        window.location = "/";
    });
}