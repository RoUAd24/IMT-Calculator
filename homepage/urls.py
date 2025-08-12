from django.urls import path

from .views import homeview

urlpatterns = [
    path('',homeview,name='homepage')
]
# 192.168.137.1
# 192.168.0.1
# 