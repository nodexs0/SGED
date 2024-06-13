from rest_framework import viewsets
from .models import Curso, Inscripcion
from .serializers import CursoSerializer, InscripcionSerializer
from rest_framework.permissions import AllowAny

class CursoViewSet(viewsets.ModelViewSet):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer
    permission_classes = [AllowAny]  # Permitir acceso sin autenticación

class InscripcionViewSet(viewsets.ModelViewSet):
    queryset = Inscripcion.objects.all()
    serializer_class = InscripcionSerializer
    permission_classes = [AllowAny]  # Permitir acceso sin autenticación
