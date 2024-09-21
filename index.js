const express = require('express');

const { faker } = require('@faker-js/faker'); // Implementamos el paquete Faker.
// A continuación vamos a crear una aplicación. ¿Cómo se hace esto? Mediante una variable const que lleve el nombre de: |pp|, que va a ser = a |express();|, que es un constructor o es un método que al final nos va a crear esta aplicación
const app = express();
// Una vez hecho lo anterior, podemos decirle en dónde queremos que corra nuestra aplicación; entonces le decimos el puerto en donde queremos que corra. Normalmente podemos poner el puerto 3000, 3005; pero en este caso vamos a colocar el 3000.
const port = 3000;
// Pero fíjate algo muy particular, ya creamos la aplicación con base a EXPRESS, el puerto; pero todavía no hemos hecho nada con él; simplemente la aplicación no se está utilizando. Vamos a realizar algo interesante, vamos a decirle que yo quiero definir una ruta, vamos a hablar de las rutas con más detalle, pero por ahora simplemente sigamos estas instrucciones, ejecutando el siguiente código:
app.get('/', (req, res) => { // Aquí vamos a tener un CALLBACK y vamos a poder ejecutr algo allí, va a ser la respuesta que nosotros enviamos a nuestro cliente. El CALLBACK siempre va a tener 2 parámetros el request y el response. Como necesitamos retornar, entonces vamos a utilizar el |res| y vamos a enviar un bonito |Hello world|, se crea el mensaje que se ve en la línea 9. Entonces, definimos esta primera ruta.
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => { // (2)Creamos una nueva ruta, entonces, vamos a decirle que por ejemplo yo quiero /nueva-ruta y esta nueva ruta, me va a decir 'Hola, soy una nueva ruta'. Esta es la manera como nosotros empezamos a definir varios tipos de ruta.
  res.send('Hola, soy una nueva ruta');
});

// Si te fijas, ya tenemos aquí nuestro endpoint de products; pero estamos manejando la convención de una mala manera. ¿Por qué? Porque dijimos que slash /products, y más aún con el método GET, debería devolver una lista de productos y solo estamos devolviendo un producto; entonces, este sería un uso inadecuado, porque lo que normalmente esperamos en un GET de slash /products es una lista de productos. Entonces, vamos a transformar esto en un array [ ] y aprovechamos y enviamos dos productos.
app.get('/products', (req, res) => {
  res.json([
    {
    name: 'Product 1',
    price: 1000
    },
    {
    name: 'Product 2',
    price: 1375
    }
  ]);
});
// Pero ¿cómo hacemos el endpoint para recibir o devolver el detalle de un producto recibiendo el ID? Entonces, vamos a ver y vamos a declarar un nuevo endpoint llamado: app.get('/products/:id'), lo que va a cambiar aquí es que voy a recibir un identificador y le pongo estos dos puntos |:|, que significa es que va a ser un parámetro. Luego le añado mi CALLBACK que siempre recibe el 'request' y el 'response' y con la => manejamos qué es lo que queremos retornar. Ahora, sí, podríamos decirle que queremos solo retornar un "objeto" y decimos res.json(); y devolverle un producto en específico; para ello copiamos uno de los productos anteriores y lo pegamos dentro de los parámeatros de JSON(). Es más, voy a recoger el ID que me están enviando y también añadirle la respuesta.
app.get('/products/:id', (req, res) => {
  const { id } = req.params; // ¿Cómo recogemos ese ID? Vamos a crear una variable CONST, y normalmente eso viene en el "req", acá vamos a encontrar una propiedad en el "request" llamada "params", aquí va a ver un objeto con ALL lo que hemos agregado, por ejemplo: si le ponemos un ID, allí vendría precisamente el IDENTIFICADOR |const id = req.params.id;|. Existe una mejor manera de hacerlo, utilizando la destructuración de SMACSCRIPT { }; entonces, le voy a decir que desde los parametros solo me interesa el ID. |const { id } = req.params;| esta sintaxis hace que de todos los parametros que pueda tener este OBJETO "params" solo me interesa recoger el ID, y luego, simplemente lo devolvemos !en esta parte del código el profe digita la palabra "id" en la línea 33; es decir entre: res.json({ y el name.'Products 2'!. Veamos cuál sería el resultado de este nuevo endpoint.
  res.json({
    id,
    name: 'Product 2',
    price: 1375
  });
});

// l-40. Pero veamos cómo recogeríamos éstos parámetros en nuestra aplicación. Veamos cómo recoger parámetros tipo QUERY[consulta]. Abrímos otro nuevo ENDPOINT, como el parámetro es opcional, entonces no va a venir definido directamente en la ruta, si no, pues es opcional y va a venir como parámetros dentro de nuestro REQUEST, pero desde otro objeto. A continuación el profe se traé ALL el código de la línea 31 |const { id } = req.params;| y lo pega justo debajo de este nuevo ENDPOINT |app.get('/users', (req, res) => {| y reemplaza el PARAMS por el QUERY y el ID que se encuentra dentro de las {} { id }, lo reemplaza por LIMIT y OFFSET, aquí el profe añade el comentario: "USERS tiene una nueva estrategia de paginación de LIMIT y OFFSET"; entonces aquí vamos a recoger estos dos parámetros y vamos a ver sí los recibimos o no; entonces como son opcionales se debe realizar una VALIDACIÓN con el condicional IF, si cumple las 2 condiciones nos devuelve la respuesta en |res.json({})| y si no cumple, con el ELSE nos devuelve un mensaje mediante |res.send('')|
app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset
  });
  } else {
    res.send('No hay parámetros');
  }
});

// ¿Cómo haríamos para obtener un endpoint un poco más complejo con dos parámetros? Veámoslo; entonces, vamos a crear otro endpoint en la línea 40, ejecutando el código: |app.get(‘/categories/:id/products’)| vamos a decirle por ejemplo, que el endpoint de categorías. La estructura va a ser la siguiente y yo quiero que de una categoría en específico, le voy a enviar el ID, que de ahí retorne los productos que pertenecen a esa categoría. Podríamos hacerlo de esta manera. Ese sería un endpoint que va a otro nivel de profundidad. Sin embargo, también podría recibir parámetros. Supongamos que por X motivo, también quiero el ID del producto. Aquí se debe tener en cuenta que ahora sí debe variar, porque si le pongo una ID, |app.get(‘/categories/:id/products/:id’)| la misma ruta está recibiendo dos parámetros iguales y sería incorrecto. Así que, por ejemplo, aquí le podría poner categoryId para definirlos y este va a ser productId, entonces tendríamos dos parámetros en la misma ruta |app.get(‘/categories/:categoryId/products/:productId’, (req, res) => {})| ¿Cómo los recibimos? Es muy sencillo, porque al final seguimos teniendo con nuestro request y nuestro response y nuestro callback, vamos a obtener esos parámetros y lo hacemos de la misma manera copiando el código de la línea 31 |const { id } = req.params; | y lo pegamos justo debajo del cuerpo de la función del callback de la línea 41 y lo único que debemos hacer es recogerlos con el nombre que le colocamos, en este caso categoryId y el productId |const { categoryId, productId } = req.params; | y los voy a retornar de forma directa colocándolos también dentro de los parámetros de: res.json({categoryId, productId,})
app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  });
});

// Pero qué hacemos con el puerto? el puerto todavía está sin utilizar y es porque necesitamos decirle a nuestra aplicación que debe escuchar en un puerto en específico; entonces, a |app| le agregamos |listen| y luego le decimos o utilizamos nuestra variable |port|; luego podemos tener un CALLBACK y decirle que cuando esto ya se esté ejecutando, me mande un console.log para verificar que esté corriendo en el puerto, pues que hayamos configurado. Así que por ahora puedo decirle |Mi port|, por ejemplo y luego concatena + port; entonces, esto sería nuestra primera configuración de nuestro servidor.
app.listen(port, () => {
  console.log('Mi port', + port);
});
// Bueno, ahora cómo hacemos para correr esta aplicación? Pues, recuerda que tenemos dos comandos y lo podemos correr en forma de desarrollo o en forma de producción. Vamos a utilizar nuestro entorno de desarrollo. En la terminal vamos a ejecutar el entorno de desarrollo, ejecutando el comando: |npm run dev|
