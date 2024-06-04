# forms.py
from django import forms
from .models import Curso, Inscripcion

class CursoForm(forms.ModelForm):
    class Meta:
        model = Curso
        fields = ['codigo_curso', 'nombre', 'docente']

class InscripcionForm(forms.ModelForm):
    class Meta:
        model = Inscripcion
        fields = ['alumno', 'curso']
