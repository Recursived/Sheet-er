# Generated by Django 3.0.7 on 2021-01-05 23:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_auto_20210105_2133'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='message',
            options={'ordering': ['-date']},
        ),
        migrations.AlterModelOptions(
            name='response',
            options={'ordering': ['-date']},
        ),
    ]
