# Generated by Django 3.0.7 on 2020-12-06 17:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_auto_20201203_2314'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='message',
            name='title',
        ),
    ]
