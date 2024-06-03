from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('register/docente/', views.register_docente, name='register_docente'),
    path('register/alumno/', views.register_alumno, name='register_alumno'),
]
