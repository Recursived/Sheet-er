from django.contrib import admin
from django.urls import path
from django.conf.urls import include, url
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls
API_TITLE = 'Sheets API'
API_DESCRIPTION = 'API endpoint for Sheet and all things related to them.'
schema_view = get_schema_view(title=API_TITLE)

urlpatterns = [
    url(r'^', include('api.urls')),
    #url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^schema/$', schema_view),
    url(r'^docs/', include_docs_urls(title=API_TITLE, description=API_DESCRIPTION)),
    path('admin/', admin.site.urls),
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
]

