from django.db import models

# Create your models here.
class Producto(models.Model):
    """Modelo de datos de mis productos"""
    nombre = models.CharField(max_length=50)
    stock = models.IntegerField(default=0)
    precio = models.FloatField()
    img = models.CharField(max_length=100)
    # -- Usamos el nombre para identificar
    # -- el producto
    def __str__(self):
        return self.nombre

class Pedido(models.Model):
    """Modelo de datos de mis pedidos"""
    user = models.CharField(max_length=50)
    precio = models.FloatField(default=0.0)
    producto = models.CharField(max_length=500, default="")
    # -- Usamos el user para identificar
    # -- el pedido
    def __str__(self):
        return self.user

    def addproduct (self, producto):
        self.producto=self.producto + "," + producto.nombre
        self.precio = self.precio + producto.precio
