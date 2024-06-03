from django.shortcuts import render, redirect
from .forms import CursoForm
from .models import Curso, Inscripcion
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required, user_passes_test

def is_admin(user):
    return user.is_superuser

@login_required
@user_passes_test(is_admin)
def crear_curso(request):
    if request.method == 'POST':
        form = CursoForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('lista_cursos')  # Redirecciona a la vista de lista de cursos
    else:
        form = CursoForm()
    return render(request, 'crear_curso.html', {'form': form})

@login_required
@user_passes_test(is_admin)
def lista_cursos(request):
    cursos = Curso.objects.all()
    return render(request, 'lista_cursos.html', {'cursos': cursos})