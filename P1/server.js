const http = require('http');
const url = require('url');
const fs = require('fs');
var path = require('path');
const PUERTO = 8080

// -- Se definen los tipos mime para los distintos ficheros
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
  switch (buscar) {
    case "index.html":
        if (cookie) {
          if (req.method === 'POST') {
            req.on('data', chunk => {
              if(!cookie||cookie.toString().includes('Nombre') == false) {
                  filename = 'content/html/noregistrado.html';
              } else {
              if (cookie.toString().includes('prod')) {
                  data_cookie = cookie.toString() + chunk.toString().split("=")[1];
                } else {
                  data_cookie = chunk.toString();
                }
                res.statusCode = 200;
                res.setHeader('Set-Cookie', data_cookie)
                console.log("Cookie creada y enviada al cliente: " + data_cookie);
              }
            });
          }
        }

      break;
    case "logincheck.html":
        if (req.method === 'POST') {
             req.on('data', chunk => {
                   //-- Leer los datos (convertir el buffer a cadena)
                   // Como estoy enviando en el request los datos
                   // del input type="text" de un formulario con name="Nombre",
                   // en la siguiente variable almacenaremos dicho par que nos
                   // valdrá para generar una cookie de registro.
                   data_cookie = chunk.toString();

                   //-- Mostrar los datos en la consola del servidor
                   console.log("NOMBRE recibido: " + data_cookie)
                   res.statusCode = 200;
                   res.setHeader('Set-Cookie', data_cookie)
                   console.log("Cookie creada y enviada al cliente: " + data_cookie);
                });
        }
      break;
    case "carrito.html":
        if(!cookie||cookie.toString().includes('Nombre') ==false) {
            filename = 'content/html/noregistrado.html';
        }
      break;
    case "factura.html":
        if (req.method === 'POST') {
             // Handle post info...

             var content = `<!DOCTYPE html>
             <html lang="es" dir="ltr">
               <head>
                 <meta charset="utf-8">
                 <title> FACTURA </title>
                 <link  rel="icon"   href="content/carrito.png" type="image/png" >
                 <link rel="stylesheet" href="/css/micss.css">
               </head>
               <body>

                 <div class="iconos">
                 <h1 id="mainTitle" class="icon" style="font-size:6vw"> FACTURA <h1>
                 <img id ="icon0" class="icon" src="logo.png" alt="logo" >
                 <a href="index.html">
                 <img id ="icon1" class="icon" src="inicio.png" alt="inicio" >
                 </a>
                 <a href="carrito.html">
                 <img id ="icon2" class="icon" src="carrito.png" alt="carrito">
                 </a>
                 <a href="login.html">
                 <img id ="icon3" class="icon" src="registro.png" alt="registro">
                 </a>
                 </div>

               </body>
             </html> `

             req.on('data', chunk => {
                   //-- Leer los datos (convertir el buffer a cadena)
                   data = chunk.toString();

                   //-- Mostrar los datos en la consola del servidor

                   console.log("Datos recibidos: " + data)

                   var nombre = data.split("&")[0].split("=")[1];
                   var apellido = data.split("&")[1].split("&")[0].split("=")[1];
                   var pago = (data.split("pago=")[1].split("&")[0]).replace("+", " ");
                   var entrega = (data.split("hora=")[1].split("&")[0]).replace("%C3%B1","ñ");
                   console.log("Nombre=" + nombre );
                   console.log("Apellido=" + apellido);
                   console.log("Pago=" + pago );
                   console.log("Entrega=" + entrega );
                   if (cookie.toString().includes('prod')) {
                     string = "NOMBRE: " + nombre +  "///" + "   APELLIDO: "  + apellido +
                               "///" + "   PAGO: " + pago +  "///" + " FRANJA HORARIA DE ENTREGA: " + entrega +
                                "///" + "   VEHÍCULO: " + cookie.split("prod=")[1].split(";")[0];
                   } else {
                     string = "ANTES DE COMPRAR DEBERÁ SELECCIONAR SU PRODUCTO"
                   }

                   res.statusCode = 200;
                   //-- Añadir los datos a la respuesta
                   content += string;
                   console.log("COOKIES: "+ cookie)
                });

             req.on('end', ()=> {
                   //-- Generar el mensaje de respuesta
                   res.setHeader('Content-Type', 'text/html')
                   res.write(content);
                   res.end();
                   })
                   return
         }

         break;
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
