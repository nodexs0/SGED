from django.contrib import admin
from .models import Pregunta, Respuesta, Evaluacion, Comentario

# Register your models here.
admin.site.register(Pregunta)
admin.site.register(Respuesta)
admin.site.register(Evaluacion)
admin.site.register(Comentario)