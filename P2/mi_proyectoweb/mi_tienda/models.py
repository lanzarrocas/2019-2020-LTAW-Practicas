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
