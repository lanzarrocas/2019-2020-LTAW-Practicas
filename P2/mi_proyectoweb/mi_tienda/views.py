from django.shortcuts import render
from mi_tienda.models import Producto, Pedido

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
        try:
            pedido = Pedido.objects.get(user=persona)
            prod.stock -= int(cantidad)
            prod.save()
            pedido.addproduct(prod)
            pedido.save()
            return render(request, 'recepcion.html', {'productos':prod, 'stock':True, 'persona':persona})
        except:
            return render(request, 'register.html', {})

        # return HttpResponse("Datos recibidos!!. Comprador: " + request.POST['nombre'])
def register(request):

    return render(request, 'register.html', {})

def carrito(request):
    return render(request, 'carrito.html', {'pedido':"" , 'ok':False, 'precio':""})

def vercarrito(request):
    try:
        pedido = Pedido.objects.get(user=request.POST['user'])
        context = {'pedido': pedido.producto , 'ok':True, 'precio': pedido.precio}
        return render(request, 'carrito.html', context)
    except :
        return render(request, 'register.html', {})

def registerok(request):
    pedido = Pedido(user=request.POST['user'])
    pedido.save()
    return render(request, 'indice.html', {})
