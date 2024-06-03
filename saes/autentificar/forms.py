from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import Docente, Alumno

class LoginForm(forms.Form):
    matricula = forms.CharField(label='Matrícula', max_length=20)
    password = forms.CharField(label='Contraseña', widget=forms.PasswordInput)

class DocenteRegisterForm(UserCreationForm):
    class Meta:
        model = Docente
        fields = ['matricula', 'password1', 'password2']

class AlumnoRegisterForm(UserCreationForm):
    class Meta:
        model = Alumno
        fields = ['matricula', 'password1', 'password2']