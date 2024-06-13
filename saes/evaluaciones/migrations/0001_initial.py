# Generated by Django 5.0.6 on 2024-06-13 08:26

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('administracion', '0003_remove_inscripcion_evaluacion_docente'),
        ('autentificar', '0002_remove_alumno_carrera_remove_docente_especialidad'),
    ]

    operations = [
        migrations.CreateModel(
            name='Pregunta',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('texto', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Comentario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comentario', models.TextField()),
                ('curso', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='administracion.curso')),
            ],
        ),
        migrations.CreateModel(
            name='Evaluacion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('respuestas_completas', models.BooleanField(default=False)),
                ('alumno', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='autentificar.alumno')),
                ('curso', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='administracion.curso')),
            ],
        ),
        migrations.CreateModel(
            name='Respuesta',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('respuesta', models.IntegerField()),
                ('curso', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='administracion.curso')),
                ('pregunta', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='evaluaciones.pregunta')),
            ],
        ),
    ]