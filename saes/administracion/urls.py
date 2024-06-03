# urls.py
from django.urls import path
from . import views

urlpatterns = [
    # Otras URLs de tu aplicación
    path('lista_cursos/', views.lista_cursos, name='lista_cursos'),
    path('crear_curso/', views.crear_curso, name='crear_curso'),
]
