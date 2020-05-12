const http = require('http');
const url = require('url');
const fs = require('fs');
var path = require('path');
const PUERTO = 8080

// -- Se definen los tipos mime de nuestros ficheros
var mimeTypes = {
  '.js' : 'text/javascript',
  '.html' : 'text/html',
  '.css' : 'text/css',
  '.png' : 'image/png'
}

//-- Configurar y lanzar el servidor. Por cada peticion recibida
//-- se imprime un mensaje en la consola
http.createServer((req, res) => {
  console.log("----------> Peticion recibida (request from browser)")
  // -- Guardo en buscar el recurso solicitado. Si no se accede a ninguno
  // la variable guarda el valor 'index.html' m que corresponde a la página de inicio
  var buscar = path.basename(decodeURI(req.url)) || 'index.html' ,
  // -- Guardo el formato del recurso solicitado ya que he creado
  // diferentes carpetas para organizarlos
  split = buscar.split(".")[1];
    switch (split) {
      case "html":
        var filename = 'content/html/' + buscar;
        break;
      case "png":
          var filename = 'content/png/' + buscar;
          break;
      case "css":
          var filename = 'content/css/' + buscar;
            break;
      default:
        var filename = 'content/' + buscar;
          break;
    }

  // var filename = 'content/' + buscar;
  console.log("Se ha solicitado el recurso " + filename );
  console.log("buscar=" + buscar);
  console.log("split=" + split);
  // -- Almaceno en una variable las cookies enviadas en
  // la solicitud http del cliente
  var cookie = req.headers.cookie;

  // -- Si accedemos al login , se creará una cookie de registro
  // que el servidor envia al cliente en el mensaje de respuesta
  // el cliente almacenará esta cookie
  if (buscar == "login.html") {
    res.setHeader('Set-Cookie', 'user=pablo')
    console.log("Cookie creada y enviada al servidor: (" + cookie + ")");
  }
  if (buscar == "carrito.html") {
    if(!cookie) {
      filename = 'content/noregistrado.html';
    }
 }

  //-- Leer fichero
  fs.exists(filename, function(exists) {
    // -- Si existe lo servimos
    if (exists) {

      fs.readFile(filename, function(err, data) {
            //-- Fichero no encontrado. Devolver mensaje de error
            if (err) {
              console.log("Se ha producido un error interno");
              res.writeHead(404, {'Content-Type': 'text/html'});
              return res.end("error del servidor");
            }
            console.log("----------> Peticion respondida (response from server)")
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
      // -- Si no existe devolvemos pagina no encontrada
      res.writeHead(404); // -- Archivo no encontrado
      res.end("pagina no encontrada");
  });
}).listen(PUERTO);

console.log("Servidor corriendo...");
console.log("Puerto: " + PUERTO);
