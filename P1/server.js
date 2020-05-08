const http = require('http');
const PUERTO = 8080
const url = require('url');
// -- API for interacting with the file system
const fs = require('fs');

console.log("Arrancando servidor...")

//-- Configurar el servidor. Cada vez que llegue una peteicion
//-- se notifica en la consola
server = http.createServer( (req, res) => {
  console.log("---> Peticion recibida")
  console.log("Recurso solicitado (URL): " + req.url)

  //-- Analisis de la URL recibida:
  let q = url.parse(req.url, true);

  console.log("Pathname: " +  q.pathname)
  console.log("search: " + q.search)
  console.log("Búsqueda:")
  let qdata = q.query
  console.log(qdata)

  //-- Acceso al objeto
  console.log("Artículo: " + qdata.articulo)
  console.log("Color: " + qdata.color)

}).listen(PUERTO);


console.log("Puerto: " + PUERTO)
