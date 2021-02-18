# Tareas
Aplicación web para administrar tareas. Incluye la registración de nuevos usuarios, el login y la validación de los mismos.  
<img src="https://github.com/MartinOber16/tareas-hbs/blob/master/public/assets/brand/tareas-icono.png" width="160" height="160">  
<br />
## Descripción
La arquitectura de la aplicacion esta compuesta por:  
1. Un servidor API REST desarrollado en Node JS con todas las funcionalidades para administrar usuarios y tareas.
2. Una interfaz web simple con HTML, CSS, Bootstrapt, Javascript y JQuery, implementada con Handlebars, que consume y utiliza la API REST.
3. Una base de datos NO-SQL implementada en MongoDB.
<br />  

## Instalación
Use el administrador de paquetes npm para installar la aplicación localmente.

```
npm install
```  
<br />  

## Uso
Para iniciar la aplicación ejecute el comando:

```
node server/server.js
```  
<br />  

## Configuración
Los parametros necesarios para configurar la aplicación se encuentran en el archivo "config.js" dentro del path "server/config/".  
<br />  

## Implementación
La aplicación se encuentra implementada en Heroku en el siguiente link: https://mo-tareas-server.herokuapp.com/.  
<br />  

## Contribuciones
Las propuestas de mejoras y correcciones son bienvenidas. Para cambios importantes, abra un issue primero para discutir qué le gustaría cambiar.  
<br />  

## License
[MIT](https://choosealicense.com/licenses/mit/)  
<br />  

![GitHub all releases](https://img.shields.io/github/downloads/MartinOber16/tareas-server/total)  
