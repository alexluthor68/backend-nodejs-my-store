const express = require('express');

// A continuación vamos a crear una aplicación. ¿Cómo se hace esto? Mediante una variable const que lleve el nombre de: |pp|, que va a ser = a |express();|, que es un constructor o es un método que al final nos va a crear esta aplicación
const app = express();
// Una vez hecho lo anterior, podemos decirle en dónde queremos que corra nuestra aplicación; entonces le decimos el puerto en donde queremos que corra. Normalmente podemos poner el puerto 3000, 3005; pero en este caso vamos a colocar el 3000.
const port = 3000;
// Pero fíjate algo muy particular, ya creamos la aplicación con base a EXPRESS, el puerto; pero todavía no hemos hecho nada con él; simplemente la aplicación no se está utilizando. Vamos a realizar algo interesante, vamos a decirle que yo quiero definir una ruta, vamos a hablar de las rutas con más detalle, pero por ahora simplemente sigamos estas instrucciones, ejecutando el siguiente código:
app.get('/', (req, res) => { // Aquí vamos a tener un CALLBACK y vamos a poder ejecutr algo allí, va a ser la respuesta que nosotros enviamos a nuestro cliente. El CALLBACK siempre va a tener 2 parámetros el request y el response. Como necesitamos retornar, entonces vamos a utilizar el |res| y vamos a enviar un bonito |Hello world|, se crea el mensaje que se ve en la línea 9. Entonces, definimos esta primera ruta.
  res.send('Hola mi server en express');
});
// Pero qué hacemos con el puerto? el puerto todavía está sin utilizar y es porque necesitamos decirle a nuestra aplicación que debe escuchar en un puerto en específico; entonces, a |app| le agregamos |listen| y luego le decimos o utilizamos nuestra variable |port|; luego podemos tener un CALLBACK y decirle que cuando esto ya se esté ejecutando, me mande un console.log para verificar que esté corriendo en el puerto, pues que hayamos configurado. Así que por ahora puedo decirle |Mi port|, por ejemplo y luego concatena + port; entonces, esto sería nuestra primera configuración de nuestro servidor.
app.listen(port, () => {
  console.log('Mi port', + port);
});
// Bueno, ahora cómo hacemos para correr esta aplicación? Pues, recuerda que tenemos dos comandos y lo podemos correr en forma de desarrollo o en forma de producción. Vamos a utilizar nuestro entorno de desarrollo. En la terminal vamos a ejecutar el entorno de desarrollo, ejecutando el comando: |npm run dev|
