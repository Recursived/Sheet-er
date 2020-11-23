from django.db import models

# Create your models here.

STATE = (
    ("T", "Traité"),
    ("ECT", "En cours de traitement"),
    ("NT", "Non traité")
)


class Category(models.Model):
    title = models.CharField(max_length=150, verbose_name="Titre")
    # If parent exist, it is a sub category
    parent = models.ForeignKey(
        'self', 
        null=True, 
        related_name='children',
        on_delete=models.DO_NOTHING
    )


class Message(models.Model):
    title = models.CharField(max_length=150, verbose_name="Titre")
    content = models.TextField(verbose_name="Contenu")
    author = models.PositiveIntegerField(verbose_name="PK de l'auteur")
    date = models.DateTimeField(auto_now_add=True, verbose_name="Date creation")
    category = models.OneToOneField(
        Category,
        on_delete=models.DO_NOTHING
    )
    state = models.CharField(
        max_length=30, choices=STATE,
        verbose_name="Etat", default="Non traité"
    )


class Response(models.Model):
    message = models.PositiveIntegerField(verbose_name="PK message")
    content = models.TextField(verbose_name="Contenu")
    date = models.DateTimeField(auto_now_add=True, verbose_name="Date creation")
    parent = models.ForeignKey(
        'self', 
        null=True, 
        related_name='children',
        on_delete=models.DO_NOTHING
    )
