# from django.shortcuts import render, redirect
# from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
# from django.contrib.auth.decorators import login_required, user_passes_test
# from .forms import LoginForm, DocenteRegisterForm, AlumnoRegisterForm
# from .models import Docente, Alumno

# def home(request):
#     if request.user.is_authenticated:
#         if hasattr(request.user, 'docente'):
#             return render(request, 'docente_home.html', {'user': request.user})
#         elif hasattr(request.user, 'alumno'):
#             return render(request, 'alumno_home.html', {'user': request.user})
#         else:
#             return render(request, 'home.html', {'user': request.user})
#     else:
#         return render(request, 'home.html')

# def login_view(request):
#     if request.method == 'POST':
#         form = LoginForm(request.POST)
#         if form.is_valid():
#             matricula = form.cleaned_data.get('matricula')
#             password = form.cleaned_data.get('password')
#             user = authenticate(request, matricula=matricula, password=password)
#             if user is not None:
#                 auth_login(request, user)
#                 return redirect('home')
#             else:
#                 form.add_error(None, 'Matrícula o contraseña incorrectas')
#     else:
#         form = LoginForm()
#     return render(request, 'login.html', {'form': form})

# @login_required
# def logout_view(request):
#     auth_logout(request)
#     return redirect('login')

# def is_admin(user):
#     return user.is_superuser

# def is_docente(user):
#     return hasattr(user, 'docente')

# def is_alumno(user):
#     return hasattr(user, 'alumno')

# @login_required
# @user_passes_test(is_admin)
# def register_docente(request):
#     if request.method == 'POST':
#         form = DocenteRegisterForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('home')
#     else:
#         form = DocenteRegisterForm()
#     return render(request, 'register_docente.html', {'form': form})

# @login_required
# @user_passes_test(is_admin)
# def register_alumno(request):
#     if request.method == 'POST':
#         form = AlumnoRegisterForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('home')
#     else:
#         form = AlumnoRegisterForm()
#     return render(request, 'register_alumno.html', {'form': form})

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
import json

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        matricula = data.get('matricula')
        password = data.get('password')

        # Autenticar al usuario
        user = authenticate(request, matricula=matricula, password=password)
        
        if user is not None:
            # Iniciar sesión si las credenciales son válidas
            login(request, user)
            # Construir los datos del usuario específicos de la subclase
            if hasattr(user, 'docente'):
                user_data = {
                    'id': user.id,
                    'matricula': user.matricula,
                    'tipo': 'docente',
                    # Agregar más campos específicos del docente si es necesario
                }
            elif hasattr(user, 'alumno'):
                user_data = {
                    'id': user.id,
                    'matricula': user.matricula,
                    'tipo': 'alumno',
                    # Agregar más campos específicos del alumno si es necesario
                }
            else:
                # Esto debería ser manejado según tu lógica de negocio
                user_data = {'error': 'Usuario no identificado'}

            return JsonResponse(user_data)  # Devolver los datos del usuario
        else:
            return JsonResponse({'error': 'Matrícula o contraseña incorrectas'}, status=400)
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)

@csrf_exempt
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'message': 'Cierre de sesión exitoso'})
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)
