# Generated by Django 3.0.7 on 2020-11-23 19:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20201123_1912'),
    ]

    operations = [
        migrations.AlterField(
            model_name='response',
            name='message',
            field=models.PositiveIntegerField(verbose_name='PK message'),
        ),
    ]
