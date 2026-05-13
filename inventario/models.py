from django.db import models


class Producto(models.Model):
    nombre = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)
    codigo_barras = models.CharField(max_length=100, unique=True)
    creado_el = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre