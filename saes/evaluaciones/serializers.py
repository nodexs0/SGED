# serializers.py
from rest_framework import serializers
from .models import Evaluacion, Pregunta

class EvaluacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evaluacion
        fields = ['id', 'curso', 'alumno', 'respuestas_completas']

class PreguntaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pregunta
        fields = ['id', 'texto']