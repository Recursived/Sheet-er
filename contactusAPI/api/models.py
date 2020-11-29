from django.db import models

# Create your models here.

STATE = (
    ("T", "Traité"),
    ("ECT", "En cours de traitement"),
    ("NT", "Non traité")
)


class Category(models.Model):
    class Meta:
        ordering = ["-id"]

    title = models.CharField(max_length=150, verbose_name="Titre")
    # If parent exist, it is a sub category
    parent = models.ForeignKey(
        'self',
        null=True,
        default=None,
        related_name='children',
        on_delete=models.DO_NOTHING
    )

    code = models.CharField(
        max_length=50, 
        verbose_name="Code de la categorie",
        null=True,
        default=None
    )

    def __str__(self):
        return f"{self.title} --> code : {self.code}"


class Message(models.Model):
    class Meta:
        ordering = ['-id']

    title = models.CharField(max_length=150, verbose_name="Titre")
    content = models.TextField(verbose_name="Contenu")
    author = models.PositiveIntegerField(verbose_name="PK de l'auteur")
    date = models.DateTimeField(
        auto_now_add=True, verbose_name="Date creation")
    category = models.ForeignKey(
        Category,
        on_delete=models.DO_NOTHING
    )
    state = models.CharField(
        max_length=30, choices=STATE,
        verbose_name="Etat", default="Non traité"
    )

    def __str__(self):
        return f"{self.title} : {self.author}"


class Response(models.Model):
    class Meta:
        ordering = ['-id']

    message = models.PositiveIntegerField(
        verbose_name="PK message",
        default=None
    )
    content = models.TextField(verbose_name="Contenu")
    date = models.DateTimeField(
        auto_now_add=True, verbose_name="Date creation")
    parent = models.ForeignKey(
        'self',
        null=True,
        related_name='children',
        on_delete=models.DO_NOTHING
    )

    def __str__(self):
        return f"Reponse : {self.date}"
