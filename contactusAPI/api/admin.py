from django.contrib import admin

from .models import Category, Message

# Register your models here.
admin.site.register(Message)
admin.site.register(Category)
