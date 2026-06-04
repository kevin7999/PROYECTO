from django.db import models

class Producto(models.Model):
    CATEGORIA_CHOICES = [
        ('ACEITE', 'Aceite / Lubricante'),
        ('GRASA', 'Grasas'),
        ('QUIMICO', 'Aditivos y Químicos (SQ / Tratauto)'),
        ('ACCESORIO', 'Accesorios (Cepillos, etc.)'),
        ('REPUESTO', 'Pastillas y Frenos'),
    ]

    nombre = models.CharField(max_length=150, default='', verbose_name="Descripción del Producto")
    categoria = models.CharField(max_length=20, choices=CATEGORIA_CHOICES, default='ACEITE', verbose_name="Categoría")
    
    # Valores numéricos con default=0 para evitar preguntas en la terminal
    stock = models.IntegerField(default=0, verbose_name="Cantidad en Inventario (CANTIDAD)")
    precio_compra = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, verbose_name="Precio de Costo (P.UNIT)")
    precio_venta = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, verbose_name="Precio de Venta ($ TOTAL DÓLAR)")
    
    vendidos = models.IntegerField(default=0, verbose_name="Unidades Vendidas")
    codigo_barras = models.CharField(max_length=50, unique=True, blank=True, null=True, verbose_name="Código de Barras")
    ubicacion_estante = models.CharField(max_length=100, blank=True, null=True, verbose_name="Ubicación (Ej: Estante 7, Carrito)")

    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = "Producto"
        verbose_name_plural = "Productos"