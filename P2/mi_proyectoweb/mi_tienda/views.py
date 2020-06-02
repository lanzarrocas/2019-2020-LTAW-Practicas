from django.shortcuts import render
from mi_tienda.models import Producto

# Create your views here.
# -- Fichero mi_tienda/views.py
from django.http import HttpResponse

# -- Vista principal de mi tienda
# -- El nombre de la vista puede ser cualquiera. Nosotros lo hemos
# -- llamado index, pero se podría haber llamado pepito
def index(request):
    # -- return HttpResponse("Hola! esta es la página principal de Mi tienda!")
    return render(request, 'indice.html', {})

def list(request):
    productos = Producto.objects.all()
    html = "<h2>Listado de articulos</h2>"
    for prod in productos:
        print(prod.nombre)
        html += '<p>'+ prod.nombre + ' ' + str(prod.precio) + str(prod.stock) + ' ' + '<p>'
    return HttpResponse(html)
