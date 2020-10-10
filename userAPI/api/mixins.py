import operator
from functools import reduce

from django.db.models import Q
from django.shortcuts import get_object_or_404


class MultipleFieldLookupMixin(object):
    def get_object(self):
        queryset = self.get_queryset()  # Get the base queryset
        queryset = self.filter_queryset(queryset)
        filter = {}
        for field in self.lookup_fields:
            if self.kwargs[field]:  # Ignore empty fields.
                filter[field] = self.kwargs[field]
        return get_object_or_404(queryset, **filter)  # Lookup the object
