# from django.shortcuts import render, redirect, get_object_or_404
# from django.contrib.auth.decorators import login_required, user_passes_test
# from .forms import PreguntaForm, RespuestaForm
# from administracion.models import Curso, Inscripcion
# from .models import Pregunta, Respuesta

# def is_alumno(user):
#     return hasattr(user, 'alumno')

# def is_docente(user):
#     return hasattr(user, 'docente')

# def is_admin(user):
#     return user.is_superuser

# @login_required
# @user_passes_test(is_admin)
# def create_pregunta(request):
#     if request.method == 'POST':
#         form = PreguntaForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('list_preguntas')
#     else:
#         form = PreguntaForm()
#     return render(request, 'create_pregunta.html', {'form': form})

# @login_required
# @user_passes_test(is_admin)
# def list_preguntas(request):
#     preguntas = Pregunta.objects.all()
#     return render(request, 'list_preguntas.html', {'preguntas': preguntas})

# @login_required
# @user_passes_test(is_docente)
# def evaluacion_docente(request):
#     cursos = Curso.objects.filter(docente=request.user.docente)
#     return render(request, 'evaluacion_docente.html', {'cursos': cursos})

# @login_required
# @user_passes_test(is_alumno)
# def evaluacion_alumno(request):
#     cursos_inscritos = Inscripcion.objects.filter(alumno=request.user.alumno)
#     cursos = [inscripcion.curso for inscripcion in cursos_inscritos if not inscripcion.evaluacion_docente]
#     return render(request, 'lista_cursos.html', {'cursos': cursos})

# @login_required
# @user_passes_test(is_alumno)
# def respuesta_create(request, codigo_curso):
#     curso = get_object_or_404(Curso, codigo_curso=codigo_curso)
#     if request.method == 'POST':
#         respuesta_form = RespuestaForm(request.POST)
#         if respuesta_form.is_valid():
#             respuesta = respuesta_form.save(commit=False)
#             respuesta.curso = curso
#             respuesta.save()
#             return redirect('evaluacion_alumno')
#     else:
#         respuesta_form = RespuestaForm()
#     return render(request, 'evaluacion_pregunta.html', {'respuesta_form': respuesta_form, 'curso': curso})

# views.py
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Evaluacion, Pregunta, Respuesta
from .serializers import EvaluacionSerializer, PreguntaSerializer
from administracion.models import Curso
from autentificar.models import Docente
from administracion.serializers import CursoSerializer
import json

@api_view(['GET'])
def evaluaciones_disponibles(request, alumno_id):
    evaluaciones = Evaluacion.objects.filter(alumno__id=alumno_id, respuestas_completas=False)

    datos = []
    for evaluacion in evaluaciones:
        curso = Curso.objects.filter(codigo_curso=evaluacion.curso)
        datos.append({
            "id" : evaluacion.id,
            "alumno" : evaluacion.alumno.matricula,
            "curso" : evaluacion.curso.codigo_curso,
            "nombre_curso" : curso[0].nombre,
            "docente" : curso[0].docente.matricula
        })
        
    return Response(datos)

@api_view(['GET'])
def obtener_preguntas(request):
    preguntas = Pregunta.objects.all()
    serializer = PreguntaSerializer(preguntas, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def responder_preguntas(request):
    data = json.loads(request.body)

    try:
        
        # Iterar sobre las respuestas recibidas y guardarlas en la base de datos
        for pregunta_id, respuesta_data in data.items():
            evaluacionid = respuesta_data['evaluacionid']
            pregunta = Pregunta.objects.get(id=respuesta_data['preguntaid'])
            curso = Curso.objects.get(codigo_curso=respuesta_data['curso'])
            respuesta = Respuesta(pregunta=pregunta, respuesta=respuesta_data['respuesta'], curso=curso)
            respuesta.save()

        # Marcar la evaluación como completada
        evaluacion = Evaluacion.objects.get(id=evaluacionid)
        evaluacion.respuestas_completas = True
        evaluacion.save()

        return Response({"mensaje": "Ok"})

    except Exception as e:
        return Response({"mensaje": f"Error al procesar las respuestas: {str(e)}"}, status=500)
