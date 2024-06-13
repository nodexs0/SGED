from django.db import models
from administracion.models import Curso
from autentificar.models import Alumno

class Pregunta(models.Model):
    texto = models.CharField(max_length=255)

    def __str__(self):
        return self.texto

class Respuesta(models.Model):
    pregunta = models.ForeignKey(Pregunta, on_delete=models.CASCADE)
    respuesta = models.IntegerField(null=False)
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.pregunta}: {self.get_respuesta_display()}"
    
class Comentario(models.Model):
    comentario = models.TextField()
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)

    def __str__(self):
        return f'Comentario de {self.curso}'
    
class Evaluacion(models.Model):
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)
    alumno = models.ForeignKey(Alumno, on_delete=models.CASCADE)
    respuestas_completas = models.BooleanField(default=False)

    def __str__(self):
        return f'Evaluación de {self.curso}'

    