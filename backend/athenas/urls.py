from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from pessoa.views import PessoaViewSet

router = routers.DefaultRouter()
router.register(r'pessoas', PessoaViewSet, basename='pessoa')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]