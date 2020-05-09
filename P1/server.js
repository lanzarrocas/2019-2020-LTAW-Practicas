const http = require('http');
const url = require('url');
const fs = require('fs');
var path = require('path');
const PUERTO = 8080

var mimeTypes = {
  '.js' : 'text/javascript',
  '.html' : 'text/html',
  '.css' : 'text/css',
  '.png' : 'image/png'
}
//-- Configurar y lanzar el servidor. Por cada peticion recibida
//-- se imprime un mensaje en la consola
http.createServer((req, res) => {
  console.log("----------> Peticion recibida")
  var buscar = path.basename(decodeURI(req.url)) || 'index.html' ,
  filename = 'content/' + buscar;
  console.log("Se ha solicitado el recurso " + filename );
  //-- Leer fichero
  fs.exists(filename, function(exists) {
    if (exists) {
      fs.readFile(filename, function(err, data) {
            //-- Fichero no encontrado. Devolver mensaje de error
            if (err) {
              console.log("Se ha producido un error interno");
              res.writeHead(404, {'Content-Type': 'text/html'});
              return res.end("error del servidor");

            }
            console.log("Recurso" + filename + "ENVIADO");
            console.log();
            var headers = {'Content-Type': mimeTypes[path.extname(buscar)]};
            //-- Generar el mensaje de respuesta
            res.writeHead(200, headers);
            //res.write(data);
            res.end(data);
        });
        return;
      }

      res.writeHead(404); // -- Archivo no encontrado
      res.end("pagina no encontrada");
    });

}).listen(PUERTO);

console.log("Servidor corriendo...");
console.log("Puerto: " + PUERTO);
