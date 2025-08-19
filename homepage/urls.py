from django.urls import path
from .views import homeview, aboutview, infoview

urlpatterns = [
    path('',homeview,name='homepage'),
    path('about/',aboutview,name='aboutpage'),
    path('info/',infoview,name='infopage'),
]