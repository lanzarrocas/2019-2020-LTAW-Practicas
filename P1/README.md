# Práctica 1
    Autor: Pablo Esteban Martín
    ASIGNATURA "LTAW"
    Ingeniería de Sistemas Audiovisuales y multimedia URJC
    CURSO 2019/2020

      Hemos creado un servidor en node js que sirve ficheros estáticos
    correspondientes a una tienda web de vehículos en los cuales se
    incluyen los siguientes tipos:
    ---> HTML
    ---> javascript
    ---> png
    ----> csa
      Dependiendo del fichero que se solicite, el server analiza el path y
    asigna el mimeType correspondiente en el campo 'Content-Type' al
    mensaje de respuesta http (res).

    Para ejecutar la aplicación web abrir una terminal en la carpeta contenedora de
  este archivo y ejecutar sobre la línea de comandos:
  ---> node server.js
  A continuación, abrir el navegador y en url introducir:
  ---> http://localhost:8080/
