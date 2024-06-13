# serializers.py
from rest_framework import serializers
from .models import Evaluacion

class EvaluacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evaluacion
        fields = ['id', 'curso', 'alumno', 'respuestas_completas']
