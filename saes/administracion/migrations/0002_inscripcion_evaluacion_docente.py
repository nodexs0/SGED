# Generated by Django 5.0.6 on 2024-06-04 06:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('administracion', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='inscripcion',
            name='evaluacion_docente',
            field=models.BooleanField(default=False),
        ),
    ]
