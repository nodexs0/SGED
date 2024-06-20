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
from rest_framework import status
from .models import Evaluacion, Pregunta, Respuesta, Comentario
from .serializers import PreguntaSerializer, RespuestaSerializer, ComentarioSerializer
from administracion.models import Curso
from autentificar.models import Docente
import json
from django.shortcuts import get_object_or_404


@api_view(['GET'])
def evaluaciones_disponibles(request, alumno_id):
    try:
        evaluaciones = Evaluacion.objects.filter(alumno__id=alumno_id, respuestas_completas=False)
        datos = []

        for evaluacion in evaluaciones:
            curso = Curso.objects.get(codigo_curso=evaluacion.curso)
            datos.append({
                "id": evaluacion.id,
                "alumno": evaluacion.alumno.matricula,
                "curso": curso.codigo_curso,
                "nombre_curso": curso.nombre,
                "docente": curso.docente.matricula
            })

        return Response(datos)

    except Evaluacion.DoesNotExist:
        return Response({"error": "No se encontraron evaluaciones disponibles para este alumno"}, status=status.HTTP_404_NOT_FOUND)

    except Curso.DoesNotExist:
        return Response({"error": "No se encontró información del curso asociado a la evaluación"}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        return Response({"error": f"Error al obtener evaluaciones disponibles: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def obtener_preguntas(request):
    preguntas = Pregunta.objects.all()
    serializer = PreguntaSerializer(preguntas, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def responder_preguntas(request):
    try:
        data = json.loads(request.body)
        print(data)
        
        evaluacionid = None
        
        # Iterar sobre las respuestas recibidas y guardarlas en la base de datos
        for respuesta_data in data:
            pregunta = Pregunta.objects.get(id=respuesta_data['preguntaid'])
            curso = Curso.objects.get(codigo_curso=respuesta_data['curso'])
            respuesta = Respuesta(pregunta=pregunta, respuesta=respuesta_data['respuesta'], curso=curso)
            print(respuesta)
            respuesta.save()

            if not evaluacionid:
                evaluacionid = respuesta_data['evaluacionid']
        
        if evaluacionid:
            # Marcar la evaluación como completada
            evaluacion = Evaluacion.objects.get(id=evaluacionid)
            evaluacion.respuestas_completas = True
            evaluacion.save()

        return Response({"mensaje": "Ok"})

    except Exception as e:
        return Response({"mensaje": f"Error al procesar las respuestas: {str(e)}"}, status=500)



@api_view(['POST'])
def respuestas_curso(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            curso_codigo = data.get('cursoId')
            # Validar que se envíe el código del curso
            if not curso_codigo:
                return Response({"error": "Debe proporcionar el código del curso"}, status=status.HTTP_400_BAD_REQUEST)

            # Obtener el curso desde la base de datos o devolver 404 si no existe
            curso = get_object_or_404(Curso, codigo_curso=curso_codigo)

            # Filtrar respuestas por el curso encontrado
            respuestas = Respuesta.objects.filter(curso=curso)
            serializer = RespuestaSerializer(respuestas, many=True)
            return Response(serializer.data)

        except json.JSONDecodeError:
            return Response({"error": "Datos no válidos en el cuerpo de la solicitud"}, status=status.HTTP_400_BAD_REQUEST)

        except Curso.DoesNotExist:
            return Response({"error": "El curso solicitado no existe"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    return Response({"error": "Método no permitido"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])
def guardar_comentario(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            curso_codigo = data.get('cursoId')
            comentario = data.get('comentario')
            # Validar que se envíe el código del curso

            if not curso_codigo:
                return Response({"error": "Debe proporcionar el código del curso"}, status=status.HTTP_400_BAD_REQUEST)
            
            if not comentario:
                return Response({"error": "Debe proporcionar un comentario"}, status=status.HTTP_400_BAD_REQUEST)
            
            # Obtener el curso desde la base de datos o devolver 404 si no existe
            curso = get_object_or_404(Curso, codigo_curso=curso_codigo)
            comentario = Comentario(comentario=comentario, curso=curso)
            comentario.save()
            print(comentario)
            return Response({"mensaje": "Ok"})
        except json.JSONDecodeError:
            return Response({"error": "Datos no válidos en el cuerpo de la solicitud"}, status=status.HTTP_400_BAD_REQUEST)
        
        except Curso.DoesNotExist:
            return Response({"error": "El curso solicitado no existe"}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    return Response({"error": "Método no permitido"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['POST'])
def comentarios_curso(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            curso_codigo = data.get('cursoId')
            # Validar que se envíe el código del curso
            if not curso_codigo:
                return Response({"error": "Debe proporcionar el código del curso"}, status=status.HTTP_400_BAD_REQUEST)

            # Obtener el curso desde la base de datos o devolver 404 si no existe
            curso = get_object_or_404(Curso, codigo_curso=curso_codigo)

            # Filtrar comentarios por el curso encontrado
            comentarios = Comentario.objects.filter(curso=curso)
            serializer = ComentarioSerializer(comentarios, many=True)
            return Response(serializer.data)

        except json.JSONDecodeError:
            return Response({"error": "Datos no válidos en el cuerpo de la solicitud"}, status=status.HTTP_400_BAD_REQUEST)

        except Curso.DoesNotExist:
            return Response({"error": "El curso solicitado no existe"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    return Response({"error": "Método no permitido"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)