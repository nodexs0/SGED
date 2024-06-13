# # urls.py
# from django.urls import path
# from . import views

# urlpatterns = [
#     # Otras URLs de tu aplicación
#     path('lista_cursos/', views.lista_cursos, name='lista_cursos'),
#     path('crear_curso/', views.crear_curso, name='crear_curso'),
#     path('inscribir_alumno_curso/', views.inscribir_alumno_curso, name='inscribir_alumno_curso'),
# ]

from django.urls import path
from . import views

urlpatterns = [
    # URLs para obtener los cursos de un alumno o docente
    path('cursos/alumno/<int:alumno_id>/', views.cursos_alumno, name='cursos_alumno'),
    path('cursos/docente/<int:docente_id>/', views.cursos_docente, name='cursos_docente'),
    path('cursos/<str:codigo_curso>/', views.obtenercurso, name='evaluaciones_curso'),
    # Otras URLs de tu aplicación
]