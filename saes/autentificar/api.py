from rest_framework import viewsets
from .models import User, Docente, Alumno
from .serializers import UserSerializer, DocenteSerializer, AlumnoSerializer
from rest_framework.permissions import AllowAny

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Permitir acceso sin autenticación

class DocenteViewSet(viewsets.ModelViewSet):
    queryset = Docente.objects.all()
    serializer_class = DocenteSerializer
    permission_classes = [AllowAny]  # Permitir acceso sin autenticación

class AlumnoViewSet(viewsets.ModelViewSet):
    queryset = Alumno.objects.all()
    serializer_class = AlumnoSerializer
    permission_classes = [AllowAny]  # Permitir acceso sin autenticación
