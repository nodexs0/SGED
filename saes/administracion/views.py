# from django.shortcuts import render, redirect
# from .forms import CursoForm, InscripcionForm
# from .models import Curso, Inscripcion
# from django.shortcuts import render, redirect
# from django.contrib.auth.decorators import login_required, user_passes_test

# def is_admin(user):
#     return user.is_superuser

# @login_required
# @user_passes_test(is_admin)
# def crear_curso(request):
#     if request.method == 'POST':
#         form = CursoForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('lista_cursos')  # Redirecciona a la vista de lista de cursos
#     else:
#         form = CursoForm()
#     return render(request, 'crear_curso.html', {'form': form})

# @login_required
# @user_passes_test(is_admin)
# def lista_cursos(request):
#     cursos = Curso.objects.all()
#     return render(request, 'lista_cursos.html', {'cursos': cursos})


# @login_required
# def inscribir_alumno_curso(request):
#     if request.method == 'POST':
#         form = InscripcionForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('lista_cursos')  # Redirige a la lista de cursos después de la inscripción
#     else:
#         form = InscripcionForm()
#     return render(request, 'inscribir_alumno_curso.html', {'form': form})

from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Curso
from .serializers import CursoSerializer, InscripcionSerializer

@api_view(['GET'])
def cursos_alumno(request, alumno_id):
    cursos = Curso.objects.filter(inscripcion__alumno__id=alumno_id)
    serializer = CursoSerializer(cursos, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def cursos_docente(request, docente_id):
    cursos = Curso.objects.filter(docente__id=docente_id)
    serializer = CursoSerializer(cursos, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def obtenercurso(request, codigo_curso):  # Ajusta la firma de la función
    curso = Curso.objects.get(codigo_curso=codigo_curso)  # Utiliza el parámetro correcto
    serializer = CursoSerializer(curso)
    return Response(serializer.data)
