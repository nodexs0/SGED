from django import forms
from .models import Pregunta, Respuesta

class PreguntaForm(forms.ModelForm):
    class Meta:
        model = Pregunta
        fields = ['texto']

class RespuestaForm(forms.ModelForm):
    class Meta:
        model = Respuesta
        fields = ['pregunta', 'respuesta']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['respuesta'].widget.attrs['required'] = 'required'