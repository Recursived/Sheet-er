# Generated by Django 3.0.7 on 2020-11-23 19:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='date',
            field=models.DateTimeField(auto_now_add=True, verbose_name='Date creation'),
        ),
        migrations.CreateModel(
            name='Response',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField(verbose_name='Contenu')),
                ('date', models.DateTimeField(auto_now_add=True, verbose_name='Date creation')),
                ('message', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.Message')),
                ('parent', models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='children', to='api.Response')),
            ],
        ),
    ]