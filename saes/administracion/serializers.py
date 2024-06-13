from rest_framework import serializers
from .models import Curso, Inscripcion

class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = ['codigo_curso', 'nombre', 'docente']

class InscripcionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inscripcion
        fields = ['alumno', 'curso', 'evaluacion_docente']
