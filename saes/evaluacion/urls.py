from django.urls import path
from . import views

urlpatterns = [
    path('pregunta/create/', views.create_pregunta, name='create_pregunta'),
    path('preguntas/', views.list_preguntas, name='list_preguntas'),
]
