# Generated by Django 5.0.6 on 2024-05-30 20:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('autentificar', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='alumno',
            name='carrera',
        ),
        migrations.RemoveField(
            model_name='docente',
            name='especialidad',
        ),
    ]
