from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class SheetTag(models.Model):
    label = models.CharField(max_length=50, verbose_name='Label')

    def __str__(self):
        return self.label

class SheetType(models.Model):
    label = models.CharField(max_length=200, verbose_name='Label')

    def __str__(self):
        return self.label


class Sheet(models.Model):
    content = models.TextField(verbose_name='Contenu fiche')
    title = models.CharField(max_length=255, verbose_name='Titre')
    mark = models.FloatField(
                validators=[MinValueValidator(0), MaxValueValidator(5)],
                verbose_name='Note', 
                null=True
                )
    plagiarism_rate = models.FloatField(
        verbose_name='Taux de plagiat',
        validators=[MinValueValidator(0), MaxValueValidator(100)]
        )
    subject = models.ForeignKey('SheetType', on_delete=models.CASCADE)
    tags = models.ManyToManyField('SheetTag')
    creation_date = models.DateField(
        verbose_name="Date de creation",
        name="creation_date",
        auto_now=True
        )
