# Generated by Django 3.0.7 on 2021-04-01 13:00

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SheetTag',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('label', models.CharField(max_length=50, verbose_name='Label')),
            ],
            options={
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='SheetType',
            fields=[
                ('id', models.PositiveIntegerField(primary_key=True, serialize=False)),
                ('label', models.CharField(max_length=200, verbose_name='Label')),
            ],
            options={
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='Sheet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField(verbose_name='Contenu fiche')),
                ('descr', models.TextField(blank=True, null=True, verbose_name='Description fiche')),
                ('title', models.CharField(max_length=255, verbose_name='Titre')),
                ('mark', models.FloatField(null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(5)], verbose_name='Note')),
                ('plagiarism_rate', models.FloatField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(100)], verbose_name='Taux de plagiat')),
                ('creation_date', models.DateField(auto_now=True, verbose_name='Date de creation')),
                ('locale', models.CharField(choices=[('fr-FR', 'Français'), ('en-EN', 'English')], default='en-EN', max_length=50, verbose_name='Locale')),
                ('nb_click', models.IntegerField(default=0)),
                ('next_sheet', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='children', to='api.Sheet')),
                ('subject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.SheetType')),
                ('tags', models.ManyToManyField(to='api.SheetTag')),
            ],
            options={
                'ordering': ['-creation_date'],
            },
        ),
    ]
