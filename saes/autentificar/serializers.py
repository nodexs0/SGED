from rest_framework import serializers
from .models import User, Docente, Alumno

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['matricula', 'is_active', 'is_staff']

class DocenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Docente
        fields = ['matricula']

class AlumnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumno
        fields = '__all__'
