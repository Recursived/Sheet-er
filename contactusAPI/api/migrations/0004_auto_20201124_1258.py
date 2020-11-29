# Generated by Django 3.0.7 on 2020-11-24 12:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20201123_1928'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='category',
            options={'ordering': ['-id']},
        ),
        migrations.AlterModelOptions(
            name='message',
            options={'ordering': ['-id']},
        ),
        migrations.AlterModelOptions(
            name='response',
            options={'ordering': ['-id']},
        ),
        migrations.AlterField(
            model_name='response',
            name='message',
            field=models.PositiveIntegerField(default=None, verbose_name='PK message'),
        ),
    ]