# serializers.py
from rest_framework import serializers
from .models import Evaluacion, Pregunta, Respuesta, Comentario

class EvaluacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evaluacion
        fields = ['id', 'curso', 'alumno', 'respuestas_completas']

class PreguntaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pregunta
        fields = ['id', 'texto']

class RespuestaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Respuesta
        fields = ['id', 'pregunta', 'respuesta', 'curso']

class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario
        fields = ['id', 'comentario', 'curso']