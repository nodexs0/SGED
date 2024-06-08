# from django.urls import path
# from . import views

# urlpatterns = [
#     path('', views.home, name='home'),
#     path('login/', views.login_view, name='login'),
#     path('logout/', views.logout_view, name='logout'),
#     path('register/docente/', views.register_docente, name='register_docente'),
#     path('register/alumno/', views.register_alumno, name='register_alumno'),
# ]

from django.urls import path, include
from rest_framework import routers
from .api import UserViewSet, DocenteViewSet, AlumnoViewSet
from .views import login_view

router = routers.DefaultRouter()
router.register('user', UserViewSet, 'user')
router.register('docente', DocenteViewSet, 'docente')
router.register('alumno', AlumnoViewSet, 'alumno')

urlpatterns = [
    path('login/', login_view, name='login'),
    # path('logout/', logout_view, name='logout'),
    path('api', include(router.urls)),  # Incluir las rutas generadas por el router de DRF
]