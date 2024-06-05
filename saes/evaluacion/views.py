from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required, user_passes_test
from .forms import PreguntaForm, RespuestaForm
from administracion.models import Curso, Inscripcion
from .models import Pregunta, Respuesta

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
    cursos = Curso.objects.filter(docente=request.user.docente)
    return render(request, 'evaluacion_docente.html', {'cursos': cursos})

@login_required
@user_passes_test(is_alumno)
def evaluacion_alumno(request):
    cursos_inscritos = Inscripcion.objects.filter(alumno=request.user.alumno)
    cursos = [inscripcion.curso for inscripcion in cursos_inscritos if not inscripcion.evaluacion_docente]
    return render(request, 'lista_cursos.html', {'cursos': cursos})

@login_required
@user_passes_test(is_alumno)
def respuesta_create(request, codigo_curso):
    curso = get_object_or_404(Curso, codigo_curso=codigo_curso)
    if request.method == 'POST':
        respuesta_form = RespuestaForm(request.POST)
        if respuesta_form.is_valid():
            respuesta = respuesta_form.save(commit=False)
            respuesta.curso = curso
            respuesta.save()
            return redirect('evaluacion_alumno')
    else:
        respuesta_form = RespuestaForm()
    return render(request, 'evaluacion_pregunta.html', {'respuesta_form': respuesta_form, 'curso': curso})
