from django.db import models


class SheetTag(models.Model):
    label = models.CharField(max_length=50, verbose_name='Label')


class SheetType(models.Model):
    label = models.CharField(max_length=200, verbose_name='Label')


class Sheet(models.Model):
    content = models.TextField(verbose_name='Contenu fiche')
    title = models.CharField(max_length=255, verbose_name='Titre')
    mark = models.IntegerField(
                choices=zip(range(1, 6), range(1, 6)), 
                verbose_name='Note', 
                null=True
                )
    plagiarism_rate = models.PositiveIntegerField(
        verbose_name='Taux de plagiat'
        )
    subject = models.ForeignKey('SheetType', on_delete=models.CASCADE)
    tags = models.ManyToManyField('SheetTag')
    creation_date = models.DateField(
        verbose_name="Date de creation",
        name="creation_date",
        auto_now=True
        )
