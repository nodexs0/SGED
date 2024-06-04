from django.db import models

class Pregunta(models.Model):
    texto = models.CharField(max_length=255)

    def __str__(self):
        return self.texto

class Respuesta(models.Model):
    RESPUESTAS_CHOICES = (
        (1, 'Muy malo'),
        (2, 'Malo'),
        (3, 'Regular'),
        (4, 'Bueno'),
        (5, 'Muy bueno'),
    )
    pregunta = models.ForeignKey(Pregunta, on_delete=models.CASCADE)
    respuesta = models.IntegerField(choices=RESPUESTAS_CHOICES)

    def __str__(self):
        return f"{self.pregunta}: {self.get_respuesta_display()}"