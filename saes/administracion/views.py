from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Curso
from .serializers import CursoSerializer, InscripcionSerializer
from django.shortcuts import get_object_or_404

@api_view(['POST'])
def cursos_alumno(request):
    # Verificar si 'userId' está presente y es un entero en el cuerpo de la solicitud
    if 'userId' not in request.data:
        return Response({'error': 'Se requiere el campo "userId" en el cuerpo de la solicitud'}, status=400)

    # Obtener el userId del cuerpo de la solicitud
    alumno_id = request.data.get('userId')
    if not isinstance(alumno_id, int):
        return Response({'error': 'El campo "userId" debe ser un entero válido'}, status=400)

    try:
        # Filtrar cursos asociados al alumno
        cursos = Curso.objects.filter(inscripcion__alumno__id=alumno_id)

        # Verificar si hay cursos encontrados
        if not cursos.exists():
            return Response({'error': f'No se encontraron cursos para el alumno con ID {alumno_id}'}, status=404)

        # Serializar los cursos encontrados
        serializer = CursoSerializer(cursos, many=True)
        return Response(serializer.data)
    
    except ValueError:
        return Response({'error': 'Valor inválido para "userId"'}, status=400)
    
    except Curso.DoesNotExist:
        return Response({'error': f'No se encontraron cursos para el alumno con ID {alumno_id}'}, status=404)
    
    except Exception as e:
        return Response({'error': 'Error interno del servidor'}, status=500)


@api_view(['POST'])
def cursos_docente(request):
    try:
        # Obtener el docente_id del cuerpo de la solicitud JSON
        docente_id = request.data.get('docente_id')
        
        # Validar que docente_id sea un entero válido
        if not isinstance(docente_id, int):
            return Response({'error': 'El campo "docente_id" debe ser un entero válido'}, status=400)
        
        # Filtrar cursos asociados al docente
        cursos = Curso.objects.filter(docente__id=docente_id)

        # Verificar si hay cursos encontrados
        if not cursos.exists():
            return Response({'error': f'No se encontraron cursos para el docente con ID {docente_id}'}, status=404)

        # Serializar los cursos encontrados
        serializer = CursoSerializer(cursos, many=True)
        return Response(serializer.data)

    except ValueError:
        return Response({'error': 'Valor inválido para "docente_id"'}, status=400)

    except Curso.DoesNotExist:
        return Response({'error': f'No se encontraron cursos para el docente con ID {docente_id}'}, status=404)

    except Exception as e:
        return Response({'error': 'Error interno del servidor'}, status=500)

@api_view(['POST'])
def obtenercurso(request):
    try:
        codigo_curso = request.data.get('codigo_curso')
        curso = Curso.objects.get(codigo_curso=codigo_curso)
        serializer = CursoSerializer(curso)
        return Response(serializer.data)
    except Curso.DoesNotExist:
        return Response({"error": "El curso solicitado no existe"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)