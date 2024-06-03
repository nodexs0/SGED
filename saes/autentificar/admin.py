from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Docente, Alumno

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('matricula', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('matricula', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('matricula', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('matricula',)
    ordering = ('matricula',)

admin.site.register(User, CustomUserAdmin)
admin.site.register(Docente)
admin.site.register(Alumno)
