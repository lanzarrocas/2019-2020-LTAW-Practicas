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
    prod = Producto.objects.all()
    return render(request, 'listado.html', {'productos':prod})

def formu(request):
    return render(request, 'formu.html', {})

def recepcion(request):
    # -- Obtener el nombre de la persona
    persona = request.POST['nombre']
    cantidad = request.POST['cantidad']
    prod = Producto.objects.get(nombre=request.POST['producto'])
    print(f" PEDIDO RECIBIDO!!! ----> {persona}")
    if (prod.stock - int(cantidad)) < 0:
        return render(request, 'recepcion.html', {'productos':prod, 'stock':False, 'persona':persona})
    else:
        prod.stock -= int(cantidad)
        prod.save()
        return render(request, 'recepcion.html', {'productos':prod, 'stock':True})
        # return HttpResponse("Datos recibidos!!. Comprador: " + request.POST['nombre'])
