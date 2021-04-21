from django.contrib import admin
from .models import SheetType, SheetTag, Sheet, Avis, SheetComment
# Register your models here.
admin.site.register(Sheet)
admin.site.register(SheetTag)
admin.site.register(SheetType)
admin.site.register(Avis)
admin.site.register(SheetComment)