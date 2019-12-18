from django.contrib import admin
from .models import SheetType, SheetTag, Sheet
# Register your models here.
admin.site.register(Sheet)
admin.site.register(SheetTag)
admin.site.register(SheetType)