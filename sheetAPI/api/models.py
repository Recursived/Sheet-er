from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.db.models.fields import BooleanField

LOCALES = (
    ('fr-FR', 'Français'),
    ('en-EN', 'English')
)

DIFFICULTY_LEVEL = (
    ('E', 'Easy'),
    ('M', 'Medium'),
    ('H', 'Hard')
)

VISIBILITY = (
    ('RE', 'Restricted'),
    ('PU', 'Public'),
    ('PR', 'Private')
)

SHEET_STATE = (
    ('D', 'Draft'),
    ('P', 'Published'),
)

TARGET_TYPE =(
    ('C', 'Comment'),
    ('S', 'Sheet'),
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


    author = models.PositiveIntegerField(verbose_name="ID auteur")
    content = models.TextField(verbose_name='Contenu fiche')
    descr = models.TextField(
        verbose_name='Description fiche',
        null=True,
        blank=True
    )
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
    difficulty_level = models.CharField(
        max_length=50, choices=DIFFICULTY_LEVEL,
        verbose_name="Niveau de la difficulte de la fiche",
        null=True, blank=True
    )
    visibility = models.CharField(
        max_length=50, choices=VISIBILITY,
        verbose_name="Niveau de visibilité de la fiche",
        default='PU', blank=True
    )
    state = models.CharField(
        max_length=50, choices=SHEET_STATE,
        verbose_name="Etat de la fiche",
        default='D', blank=True
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

    has_exercice = models.BooleanField(verbose_name="Contient exercice", default=False, blank=True)

    @property
    def score(self):
        if self.nb_click is None or self.mark is None:
            return 0
        elif self.nb_click is not None and self.mark is not None:
            return self.nb_click * self.mark

    def __str__(self):
        return f"{self.id} : {self.title}"


class SheetComment(models.Model):
    class Meta:
        ordering = ['-id']

    sheetid = models.ForeignKey('Sheet', on_delete=models.CASCADE)
    author = models.PositiveIntegerField(verbose_name="ID auteur")
    content = models.TextField(verbose_name='Contenu commentaire')
    publication_date =  models.DateField(
        verbose_name="Date de publication",
        name="publication_date",
        auto_now=True
    )
    parent = models.ForeignKey(
        'self',
        null=True,
        blank=True,
        default=None,
        related_name='children',
        on_delete=models.DO_NOTHING
    )

    def __str__(self):
        return  f"({self.sheetid}) {self.author}"


class Avis(models.Model):
    class Meta:
        ordering = ['-id']

    author = models.BigIntegerField(verbose_name="Id de l'auteur de l'avis")
    target_id = models.PositiveIntegerField(verbose_name="Id de la cible de l'avis")
    target_type = models.CharField(
        max_length=50, choices=TARGET_TYPE,
        verbose_name="Type de l'element ayant recu l'avis",
    )
    value = models.BooleanField(verbose_name="Type de l'avis (1 = Positif, 0 = Negatif)")

    def __str__(self):
        return  f"({self.author} - {self.target_id}) => {self.value}"