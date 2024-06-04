from django.db import models
from autentificar.models import Docente, Alumno

class Curso(models.Model):
    codigo_curso = models.CharField(max_length=20, primary_key=True)
    nombre = models.CharField(max_length=100)
    docente = models.ForeignKey(Docente, on_delete=models.CASCADE)

    def __str__(self):
        return self.codigo_curso

class Inscripcion(models.Model):
    alumno = models.ForeignKey(Alumno, on_delete=models.CASCADE)
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)
    evaluacion_docente = models.BooleanField(default=False)
    
    def __str__(self):
        return f'{self.alumno} inscrito en {self.curso}'
