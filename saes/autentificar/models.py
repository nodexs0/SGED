from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, matricula, password=None, **extra_fields):
        if not matricula:
            raise ValueError('El usuario debe tener una matrícula')
        user = self.model(matricula=matricula, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, matricula, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(matricula, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    matricula = models.CharField(max_length=20, unique=True)
    nombre = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'matricula'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.matricula

class Docente(User):

    class Meta:
        verbose_name = 'Docente'
        verbose_name_plural = 'Docentes'

class Alumno(User):

    class Meta:
        verbose_name = 'Alumno'
        verbose_name_plural = 'Alumnos'
