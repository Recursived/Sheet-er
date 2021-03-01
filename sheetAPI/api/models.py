from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

LOCALES = (
    ('fr-FR', 'Français'),
    ('en-EN', 'English')
)


class SheetTag(models.Model):
    class Meta:
        ordering = ['-id']
     
    id = models.AutoField(primary_key=True)
    label = models.CharField(max_length=50, verbose_name='Label')

    def __str__(self):
        return f"({self.id}) {self.label}"


class SheetType(models.Model):
    class Meta:
        ordering = ['-id']
    id = models.PositiveIntegerField(primary_key=True)
    label = models.CharField(max_length=200, verbose_name='Label')

    def __str__(self):
        return  f"({self.id}) {self.label}"


class Sheet(models.Model):
    class Meta:
        ordering = ['-creation_date']

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
    locale = models.CharField(
        max_length=50, choices=LOCALES,
        verbose_name="Locale", default="en-EN"
    )
    nb_click = models.IntegerField(default=0)
    next_sheet = models.ForeignKey(
        'self',
        null=True,
        blank=True,
        default=None,
        related_name='children',
        on_delete=models.DO_NOTHING
    )

    def __str__(self):
        return f"{self.id} : {self.title}"
