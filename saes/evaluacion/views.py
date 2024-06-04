from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required, user_passes_test
from .forms import PreguntaForm
from .models import Pregunta
from administracion.models import Curso, Inscripcion

def is_alumno(user):
    return hasattr(user, 'alumno')

def is_docente(user):
    return hasattr(user, 'docente')

def is_admin(user):
    return user.is_superuser

@login_required
@user_passes_test(is_admin)
def create_pregunta(request):
    if request.method == 'POST':
        form = PreguntaForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('list_preguntas')
    else:
        form = PreguntaForm()
    return render(request, 'create_pregunta.html', {'form': form})

@login_required
@user_passes_test(is_admin)
def list_preguntas(request):
    preguntas = Pregunta.objects.all()
    return render(request, 'list_preguntas.html', {'preguntas': preguntas})

@login_required
@user_passes_test(is_docente)
def evaluacion_docente(request):
    cursos = Curso.objects.filter(docente=request.user)
    return render(request, 'evaluacion_docente.html', {'cursos': cursos})

@login_required
@user_passes_test(is_alumno)
def evaluacion_alumno(request):
    cursos_inscritos = Inscripcion.objects.filter(alumno=request.user.alumno)
    cursos = []

    for inscripcion in cursos_inscritos:
        if inscripcion.evaluacion_docente != True:
            cursos.append(inscripcion.curso)

    return render(request, 'lista_cursos.html', {'cursos': cursos})